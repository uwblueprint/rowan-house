import React, { useContext, useState } from "react";
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
import ModuleDropdowns from "../learner/ModuleDropdowns";

const CourseOverview = (): React.ReactElement => {
  const [disableCTAButton, setDisableCTAButton] = useState(false);
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
    skip: !authenticatedUser,
  });

  const { data: moduleProgress } = useQuery(GET_MODULE_PROGRESS, {
    variables: {
      userId: authenticatedUser?.id,
      courseId: courseID,
    },
    skip: !authenticatedUser,
  });

  const onReturnToCourseOverviewClick = () => {
    history.push(HOME_PAGE);
  };

  const onLogInClick = () => {
    history.push(LOGIN_PAGE);
  };

  const onCTAClick = () => {
    let moduleIndex = null;

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
          module.startedAt !== null && module.completedAt === null,
      );

      if (moduleIndex === -1) {
        //  Go to first Not Started moduleIndex (1st Case: Skip Case)
        moduleIndex = moduleProgress?.moduleProgress?.findIndex(
          (module: ModuleProgressType) =>
            module.startedAt === null && module.completedAt === null,
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

    if (moduleIndex !== null) {
      history.push(`${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}/${moduleIndex}`);
    } else {
      setDisableCTAButton(true);
    }
  };

  const getLessonCount = () => {
    let lessonCount = 0;

    courseData?.course?.modules?.forEach((moduleContent: ModuleType) => {
      lessonCount += moduleContent?.lessons?.length;
    });

    return lessonCount;
  };

  const getButtonText = () => {
    if (!authenticatedUser) {
      return "Sign up to view course";
    }
    if (!courseProgress?.courseProgress?.length) {
      return "Start Course";
    }
    if (courseProgress?.courseProgress?.[0]?.completedAt) {
      return "View Course";
    }
    if (courseProgress?.courseProgress?.[0]?.startedAt) {
      return "Continue learning";
    }
    return "View Course";
  };

  const CTABox = ({ smallVersion = false }: { smallVersion?: boolean }) => {
    const smallDisplay = smallVersion ? "flex" : "none";
    const largeDisplay = smallVersion ? "none" : "flex";
    return (
      <Flex
        direction="column"
        width={["100%", "65%", "26rem"]}
        maxWidth="100%"
        height={authenticatedUser ? "100%" : "130%"}
        background="white"
        color="text.default"
        boxShadow="0px 5px 13px rgba(0, 0, 0, 0.1);"
        borderRadius="8px"
        overflow={["initial", "initial", "hidden"]}
        position={["initial", "initial", "relative"]}
        mt={["1em", "3em", "0px"]}
        top="90px"
        pb="24px"
        display={[smallDisplay, smallDisplay, largeDisplay]}
      >
        <Box flex="2" maxHeight="75%">
          <Image
            src={courseData?.course?.previewImage || DEFAULT_IMAGE}
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
          <Button
            width="100%"
            height="100%"
            onClick={onCTAClick}
            disabled={disableCTAButton}
          >
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
    );
  };

  return (
    <Flex direction="column" align={["center", "center", "initial"]}>
      <Banner />
      <Flex
        px={["30px", "120px"]}
        py="20px"
        height={["fit-content", "fit-content", "400px"]}
        background="background.lightgrey"
        color="white"
        align="center"
        direction={["column", "column", "row"]}
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
        <CTABox />
      </Flex>
      <CTABox smallVersion />
      <VStack
        w={["100%", "100%", "calc(100% - 28rem)"]}
        py="2rem"
        px={["30px", "7.5rem"]}
        align="left"
      >
        <Text variant="heading">Course Content</Text>
        <ModuleDropdowns
          modules={courseData?.course?.modules}
          progress={moduleProgress}
          courseID={courseID}
        />
      </VStack>
    </Flex>
  );
};

export default CourseOverview;
