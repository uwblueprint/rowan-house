import React from "react";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import CoursePreview from "./CoursePreview";

import { CoursePreviewProps } from "../../types/AdminDashboardTypes";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/practicaldev/image/fetch/s--JIe3p0M4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/093ewdrgyf1kedlhzs51.png";

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
        {dummyCourses.map((x, i) => (
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
