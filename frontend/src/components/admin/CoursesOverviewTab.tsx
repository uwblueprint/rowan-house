import React from "react";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import CoursePreview from "./CoursePreview";

import { dummyCourses } from "../../constants/DummyData";

const CoursesOverviewTab = (): React.ReactElement => {
  return (
    <Box flex="1">
      <Flex
        my={6}
        // px instead of mx to extend border completely in container
        px={9}
        justify="space-between"
        borderBottom="1px"
        borderColor="background.lightgrey"
      >
        <Text variant="display-lg" pb={6}>
          Courses
        </Text>
        <Button variant="md" leftIcon={<SmallAddIcon />}>
          Create New Course
        </Button>
      </Flex>
      <VStack spacing={12} mx={9}>
        {dummyCourses.map((course) => (
          <CoursePreview
            key={course.courseId}
            courseId={course.courseId}
            title={course.title}
            description={course.description}
            isPrivate={course.isPrivate}
            modules={course.modules}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default CoursesOverviewTab;
