import React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import CoursePreview from "../admin/CoursePreview";
import { COURSES } from "../../APIClients/queries/CourseQueries";
import { CourseResponse } from "../../APIClients/types/CourseClientTypes";
import { AdminPage } from "../../types/AdminDashboardTypes";
import SideBar from "../admin/SideBar";
import EditCourseModal from "../admin/EditCourseModal";

const ManageCoursesPage = (): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, loading, error } = useQuery<{ courses: Array<CourseResponse> }>(
    COURSES,
  );
  const { courses } = data ?? { courses: [] };

  const displayCoursePreviews = () => {
    if (!courses.length) {
      return <h1>There are no courses.</h1>;
    }
    return courses
      .map((course) => <CoursePreview key={course.id} course={course} />)
      .reverse();
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
          <Button variant="md" leftIcon={<SmallAddIcon />} onClick={onOpen}>
            Create New Course
          </Button>
        </Flex>
        <VStack spacing={12} mx={9} pb={6}>
          {loading ? <Spinner size="xl" /> : displayCoursePreviews()}
        </VStack>
      </Box>
      {isOpen && <EditCourseModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ManageCoursesPage;
