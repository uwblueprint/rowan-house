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
import { CourseProgressResponse } from "../../APIClients/types/ProgressClientTypes";

const Default = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);

  const [courseProgresses, setCourseProgresses] = useState<
    Map<string, string>
  >();

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
        const progress: Map<string, string> = new Map();
        if (progresses?.courseProgress) {
          progresses.courseProgress.forEach(
            (course: CourseProgressResponse) => {
              if (course.completedAt) {
                progress.set(course?.courseId, "Complete");
              } else if (course.startedAt) {
                progress.set(course?.courseId, "In Progress");
              }
            },
          );
        }
        setCourseProgresses(progress);
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
    if (tab_name === "All Courses" || !courseProgresses) {
      return true;
    }
    if (tab_name === "Not Started" && !courseProgresses.has(courseId)) {
      return true;
    }
    return courseProgresses.get(courseId) === tab_name;
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
          templateColumns="repeat(auto-fit, 280px)"
          width="100%"
          spacing={5}
        >
          {courses?.map((course: CourseResponse) => {
            if (checkFilter(selectedTab, course.id)) {
              let status = null;
              if (courseProgresses) {
                status = courseProgresses?.get(course.id) || "Not Started";
              }
              return (
                <CourseCard key={course.id} course={course} status={status} />
              );
            }
            return null;
          })}
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default Default;
