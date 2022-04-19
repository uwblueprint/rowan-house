import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import CoursePreview from "../admin/CoursePreview";
import { COURSES } from "../../APIClients/queries/CourseQueries";
import { CourseResponse } from "../../APIClients/types/CourseClientTypes";
import { AdminPage } from "../../types/AdminDashboardTypes";
import SideBar from "../admin/SideBar";

const ManageCoursesPage = (): React.ReactElement => {
  const [courses, setCourses] = React.useState<CourseResponse[] | null>();

  const { loading, error } = useQuery<{
    courses: Array<CourseResponse>;
  }>(COURSES, {
    onCompleted: (data) => {
      setCourses(data.courses);
    },
  });

  const displayCoursePreviews = () => {
    if (!courses?.length) {
      return <h1>There are no courses.</h1>;
    }
    return courses?.map((course) => (
      <CoursePreview
        key={course.id}
        courseId={course.id}
        title={course.title}
        description={course.description}
        isPrivate={course.private}
        modules={course.modules}
      />
    ));
  };

  if (error) return <p>Error! {error.message}</p>;

  return (
    <Flex h="100vh">
      <SideBar currentPage={AdminPage.ManageCourses} />
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
          {loading ? <Spinner size="xl" /> : displayCoursePreviews()}
        </VStack>
      </Box>
    </Flex>
  );
};

export default ManageCoursesPage;
