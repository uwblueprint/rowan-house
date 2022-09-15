import React, { useContext, useEffect, useState } from "react";
import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useLazyQuery } from "@apollo/client";
import AuthContext from "../../contexts/AuthContext";
import Banner from "../learner/Banner";
import CourseTabs, { TAB_NAMES } from "../learner/browser/CourseTabs";
import CourseCard from "../learner/browser/CourseCard";
import {
  COURSES,
  PUBLIC_COURSES,
} from "../../APIClients/queries/CourseQueries";
import { CourseResponse } from "../../APIClients/types/CourseClientTypes";
import { GET_COURSE_PROGRESS } from "../../APIClients/queries/ProgressQueries";
import { CourseType } from "../../types/ModuleEditorTypes";
import { CourseProgressResponse } from "../../APIClients/types/ProgressClientTypes";

const Default = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);

  const [courseProgresses, setCourseProgresses] = useState<
    Array<CourseProgressResponse>
  >([]);

  const [selectedTab, setSelectedTab] = useState<string>(TAB_NAMES[0]);

  const [getAllCourseData, { data: allCourseData }] = useLazyQuery(COURSES);
  const [getPublicCourseData, { data: publicCourseData }] = useLazyQuery(
    PUBLIC_COURSES,
  );

  const [getCourseProgresses, { data: courseProgressesData }] = useLazyQuery(
    GET_COURSE_PROGRESS,
  );

  useEffect(() => {
    const fetchCourseData = async () => {
      if (authenticatedUser) {
        const { data } = await getAllCourseData();
        setCourses(data?.courses);
        const { data: progresses } = await getCourseProgresses({
          variables: {
            userId: authenticatedUser?.id,
            courseIds:
              data?.courses?.map((course: CourseResponse) => course.id) || [],
          },
        });
        setCourseProgresses(progresses.courseProgress);
      } else {
        const { data } = await getPublicCourseData();
        setCourses(data?.publicCourses);
      }
    };
    fetchCourseData();
  }, [
    authenticatedUser,
    getAllCourseData,
    getPublicCourseData,
    allCourseData,
    publicCourseData,
    getCourseProgresses,
    courseProgressesData,
  ]);

  const checkFilter = (tab_name: string, courseId: string): boolean => {
    if (tab_name === "All Courses") {
      return true;
    }
    if (!courseProgresses) {
      return true;
    }
    const courseObj = courseProgresses.find(
      (course) => course.courseId === courseId,
    );
    if (!courseObj) {
      if (tab_name === "Not Started") {
        return true;
      }
      return false;
    }

    switch (tab_name) {
      case "Complete":
        return !!courseObj.completedAt;
      case "In Progress":
        return !!courseObj.startedAt && !courseObj.completedAt;
      case "Not Started":
        return !courseObj.startedAt;
      default:
        return true;
    }
  };

  return (
    <Flex direction="column">
      <Banner />
      <VStack align="start" paddingY="80px" paddingX="240px" spacing={5}>
        <Heading as="h2" size="xl">
          Courses
        </Heading>
        {authenticatedUser && (
          <CourseTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        )}
        <SimpleGrid
          templateColumns="repeat(auto-fit, 240px)"
          width="100%"
          spacing={5}
        >
          {courses?.map((course: CourseResponse) => {
            if (checkFilter(selectedTab, course.id)) {
              return <CourseCard key={course.id} course={course} />;
            }
            return <></>;
          })}
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default Default;
