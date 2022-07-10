import React, { useContext, useState } from "react";
import { Box, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import AuthContext from "../../contexts/AuthContext";
import Banner from "../learner/Banner";
import ModuleLessonCount from "../learner/ModuleLessonCount";
import { CourseType } from "../../types/ModuleEditorTypes";

const ViewCourse = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <Flex direction="column">
      <Banner />
      <Flex
        px="120px"
        py="20px"
        height="400px"
        background="background.dark"
        color="white"
        align="center"
      >
        <VStack flex="2" align="start">
          <span>breadcrumb here</span>
          <span>title here</span>
          <span>description here</span>
          <ModuleLessonCount color="white" moduleCount={10} lessonCount={24} />
        </VStack>
        <Flex
          direction="column"
          flex="1"
          height="100%"
          background="white"
          color="text.default"
          boxShadow="0px 5px 13px rgba(0, 0, 0, 0.1);"
          borderRadius="8px"
          overflow="hidden"
          position="relative"
          top="90px"
        >
          <Box flex="2">img here</Box>
          <Box flex="1">CTA here</Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ViewCourse;
