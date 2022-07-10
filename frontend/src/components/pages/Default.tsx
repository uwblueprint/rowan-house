import React, { useContext, useState } from "react";
import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import AuthContext from "../../contexts/AuthContext";
import Banner from "../learner/Banner";
import CourseTabs, { TAB_NAMES } from "../learner/browser/CourseTabs";
import CourseCard from "../learner/browser/CourseCard";
import { CourseType } from "../../types/ModuleEditorTypes";

const Default = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState<string>(TAB_NAMES[0]);

  const courses: Array<CourseType> = [
    {
      id: "1",
      title: "Understanding Abuse",
      description: "A b c...",
      image: null,
      previewImage: null,
      private: false,
      modules: [],
    },
    {
      id: "2",
      title: "Understanding Abuse",
      description: "A b c...",
      image: null,
      previewImage: null,
      private: false,
      modules: [],
    },
    {
      id: "3",
      title: "Understanding Abuse",
      description: "A b c...",
      image: null,
      previewImage: null,
      private: false,
      modules: [],
    },
    {
      id: "4",
      title: "Understanding Abuse",
      description: "A b c...",
      image: null,
      previewImage: null,
      private: false,
      modules: [],
    },
  ]; // TODO fetch courses

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
          {courses?.map((course) => (
            <CourseCard key={course.id} />
          ))}
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default Default;
