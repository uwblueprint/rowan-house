import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { dummyCourses } from "../../constants/DummyData";
import CoursePreview from "./CoursePreview";
import { COURSES } from "../../APIClients/queries/CourseQueries";
import { CourseResponse } from "../../APIClients/types/CourseClientTypes";

const CoursesOverviewTab = (): React.ReactElement => {
  const [courses, setCourses] = React.useState<CourseResponse[] | null>();

  const { loading, error } = useQuery<{
    courses: Array<CourseResponse>;
  }>(COURSES, {
    onCompleted: (data) => {
      if (!data) setCourses(dummyCourses);
      else setCourses(data.courses);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;
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
        {courses?.map((course) => (
          <CoursePreview
            key={course.id}
            courseId={course.id}
            title={course.title}
            description={course.description}
            isPrivate={course.private}
            modules={course.modules}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default CoursesOverviewTab;
