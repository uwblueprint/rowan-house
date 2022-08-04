import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import Banner from "../learner/Banner";
import ModuleLessonCount from "../learner/ModuleLessonCount";
import { GET_COURSE } from "../../APIClients/queries/CourseQueries";
import { COURSE_OVERVIEW_BASE_ROUTE } from "../../constants/Routes";
import { CourseOverviewParams } from "../../types/CourseOverviewTypes";
import { ModuleType } from "../../types/ModuleEditorTypes";

const CourseOverview = (): React.ReactElement => {
  const history = useHistory();
  const { courseID }: CourseOverviewParams = useParams();
  const { data: courseData } = useQuery(GET_COURSE, {
    variables: {
      id: courseID,
    },
  });

  const onReturnToCourseOverviewClick = () => {
    history.push(COURSE_OVERVIEW_BASE_ROUTE);
  };

  const getLessonCount = () => {
    let lessonCount = 0;

    courseData?.course?.modules?.forEach((moduleContent: ModuleType) => {
      lessonCount += moduleContent?.lessons?.length;
    });

    return lessonCount;
  };

  return (
    <Flex direction="column">
      <Banner />
      <Flex
        px="120px"
        py="20px"
        height="400px"
        background="background.lightgrey"
        color="white"
        align="center"
      >
        <VStack flex="2" align="start">
          <Box display="flex">
            <Button onClick={onReturnToCourseOverviewClick} variant="link">
              <ChevronLeftIcon color="brand.royal" mr="15px" boxSize={30} />
              <Text variant="display-xs" color="brand.royal">
                Return to Course Browsing
              </Text>
            </Button>
          </Box>
          <Text
            variant="display-lg"
            color="text.default"
            style={{ marginBottom: "16px" }}
          >
            {courseData?.course?.title}
          </Text>
          <Text
            variant="body"
            color="text.default"
            style={{ marginBottom: "16px" }}
          >
            {courseData?.course?.description}
          </Text>
          <ModuleLessonCount
            moduleCount={courseData?.course?.modules?.length}
            lessonCount={getLessonCount()}
          />
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

export default CourseOverview;
