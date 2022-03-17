import React from "react";
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { gql, useQuery } from "@apollo/client";

import { CourseResponse } from "../../APIClients/CourseAPIClient";
import CoursePreview from "./CoursePreview";

import { CoursePreviewProps } from "../../types/AdminDashboardTypes";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/practicaldev/image/fetch/s--JIe3p0M4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/093ewdrgyf1kedlhzs51.png";


const convert = (courseResponse: CourseResponse): CoursePreviewProps => {
  return {
    title: courseResponse.title,
    description: courseResponse.description,
    isPrivate: courseResponse.private,
    modules: [{ // hard code
      title: "title",
      published: true,
      imageLink: DEFAULT_IMAGE,
    }],
  }
}
const CoursesOverviewTab = (): React.ReactElement => {
  const dummyCourses: Array<CoursePreviewProps> = [
    {
      title: "Hello!",
      description: "I am a course",
      isPrivate: false,
      modules: [
        {
          title: "Module 1",
          published: true,
          imageLink: DEFAULT_IMAGE,
        },
        {
          title: "Module 2",
          published: false,
          imageLink: DEFAULT_IMAGE,
        },
        {
          title: "Module 3",
          published: true,
          imageLink: DEFAULT_IMAGE,
        },
      ],
    },
  ];

  const COURSES = gql`
  query GetCourses {
    courses {
      title
      description
      image
      previewImage
      lessons
      private
      published
    }
  }
`;

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [courses, setCourses] = React.useState<CoursePreviewProps[] | null>();

  const {loading} = useQuery(COURSES, {
    fetchPolicy: "cache-and-network",
    
    onCompleted: (data) => {
      if (!data) setCourses(dummyCourses)
      else {
        console.log(data)
        setCourses(data.courses.map((d: CourseResponse) => convert(d)));
      }
    }
  });


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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalCloseButton/>
          <ModalBody>
            Create course body
          </ModalBody>
        </ModalContent>
      </Modal>
      <VStack spacing={12} mt={6}>
        
      {loading ? 
        <Spinner size="xl"/>
       : courses?.map((x, i) => (
        <CoursePreview
          key={i}
          title={x.title}
          description={x.description}
          isPrivate={x.isPrivate}
          modules={x.modules}
        />
      )) }
      </VStack>
    </Box>
  );
};

export default CoursesOverviewTab;