import React, { useContext, useState } from "react";
import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import AuthContext from "../../contexts/AuthContext";
import Banner from "../learner/Banner";
import CourseTabs, { TAB_NAMES } from "../learner/browser/CourseTabs";
import CourseCard from "../learner/browser/CourseCard";
import { COURSES } from "../../APIClients/queries/CourseQueries";
import { CourseResponse } from "../../APIClients/types/CourseClientTypes";

const Default = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState<string>(TAB_NAMES[0]);

  const { data } = useQuery<{ courses: Array<CourseResponse> }>(COURSES);

  const { courses } = data ?? { courses: [] };

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
          {courses?.map((course: CourseResponse) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default Default;
