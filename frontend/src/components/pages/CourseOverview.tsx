import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import Banner from "../learner/Banner";
import ModuleLessonCount from "../learner/ModuleLessonCount";
import { GET_COURSE } from "../../APIClients/queries/CourseQueries";
import {
  GET_COURSE_PROGRESS,
  GET_MODULE_PROGRESS,
} from "../../APIClients/queries/ProgressQueries";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import {
  COURSE_OVERVIEW_BASE_ROUTE,
  HOME_PAGE,
  LOGIN_PAGE,
} from "../../constants/Routes";
import { CourseOverviewParams } from "../../types/CourseOverviewTypes";
import { ModuleProgressType, ModuleType } from "../../types/ModuleEditorTypes";
import AuthContext from "../../contexts/AuthContext";

const CourseOverview = (): React.ReactElement => {
  const history = useHistory();
  const { courseID }: CourseOverviewParams = useParams();
  const { authenticatedUser } = useContext(AuthContext);

  const { data: courseData } = useQuery(GET_COURSE, {
    variables: {
      id: courseID,
    },
  });

  const { data: courseProgress } = useQuery(GET_COURSE_PROGRESS, {
    variables: {
      userId: authenticatedUser?.id,
      courseIds: [courseID],
    },
  });

  const { data: moduleProgress } = useQuery(GET_MODULE_PROGRESS, {
    variables: {
      userId: authenticatedUser?.id,
      courseId: courseID,
    },
  });

  const onReturnToCourseOverviewClick = () => {
    history.push(HOME_PAGE);
  };

  const onLogInClick = () => {
    history.push(LOGIN_PAGE);
  };

  const onCTAClick = () => {
    let moduleIndex;

    if (
      !courseProgress?.courseProgress?.length ||
      courseProgress?.courseProgress?.[0]?.completedAt !== null
    ) {
      //  Go to first link
      moduleIndex = 0;
    } else {
      //  Go to first In Progress moduleIndex
      moduleIndex = moduleProgress?.moduleProgress?.findIndex(
        (module: ModuleProgressType) =>
          module?.startedAt !== null && module?.completedAt === null,
      );

      if (moduleIndex === -1) {
        //  Go to first Not Started moduleIndex (1st Case: Skip Case)
        moduleIndex = moduleProgress?.moduleProgress?.findIndex(
          (module: ModuleProgressType) =>
            module?.startedAt === null && module?.completedAt === null,
        );

        if (moduleIndex === -1) {
          //  Go to first Not Started moduleIndex (2nd Case)
          moduleIndex = courseData?.course?.modules?.findIndex(
            (module: ModuleType, index: number) =>
              index >= moduleProgress?.moduleProgress?.length &&
              module !== null,
          );
        }
      }
    }
    history.push(`${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}/${moduleIndex}`);
  };

  const getLessonCount = () => {
    let lessonCount = 0;

    courseData?.course?.modules?.forEach((moduleContent: ModuleType) => {
      lessonCount += moduleContent?.lessons?.length;
    });

    return lessonCount;
  };

  const getButtonText = () => {
    let buttonText = "";

    if (!authenticatedUser) {
      buttonText = "Sign up to view course";
    } else if (!courseProgress?.courseProgress?.length) {
      buttonText = "Start Course";
    } else {
      buttonText = courseProgress?.courseProgress?.[0]?.completedAt
        ? "View Course"
        : "Continue learning";
    }

    return buttonText;
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
        <VStack flex="2" align="start" spacing={4} pr={6}>
          <Box display="flex">
            <Button onClick={onReturnToCourseOverviewClick} variant="link">
              <ChevronLeftIcon color="brand.royal" mr="15px" boxSize={30} />
              <Text variant="display-xs" color="brand.royal">
                Return to Course Browsing
              </Text>
            </Button>
          </Box>
          <Text variant="display-lg" color="text.default">
            {courseData?.course?.title}
          </Text>
          <Text variant="body" color="text.default">
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
          height={authenticatedUser ? "100%" : "130%"}
          background="white"
          color="text.default"
          boxShadow="0px 5px 13px rgba(0, 0, 0, 0.1);"
          borderRadius="8px"
          overflow="hidden"
          position="relative"
          top="90px"
          pb="24px"
        >
          <Box flex="2" maxHeight="75%">
            <Image
              src={courseData?.image || DEFAULT_IMAGE}
              alt="Course Img"
              width="100%"
              height="100%"
              fit="cover"
            />
          </Box>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="24px 24px 0px 24px"
          >
            <Button width="100%" height="100%" onClick={onCTAClick}>
              {getButtonText()}
            </Button>
            {!authenticatedUser && (
              <Center mt="16px">
                Already a member?&nbsp;
                <Button
                  variant="link"
                  color="text.default"
                  onClick={onLogInClick}
                  textDecorationLine="underline"
                >
                  Log in
                </Button>
              </Center>
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CourseOverview;
