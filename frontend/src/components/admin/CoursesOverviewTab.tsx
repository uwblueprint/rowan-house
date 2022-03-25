import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

import CoursePreview from "./CoursePreview";
import { COURSES } from "../../APIClients/queries/CourseQueries";
import { CoursePreviewProps } from "../../types/AdminDashboardTypes";

const CoursesOverviewTab = (): React.ReactElement => {
  const { loading, error, data } = useQuery<{
    courses: Array<CoursePreviewProps>;
  }>(COURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <Box my={6} mx={9} flex="1">
      <Flex
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
      <VStack spacing={12} mt={6}>
        {data?.courses.map((x, i) => (
          <CoursePreview
            key={i}
            title={x.title}
            description={x.description}
            isPrivate={x.isPrivate}
            modules={x.modules}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default CoursesOverviewTab;
