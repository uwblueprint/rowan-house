import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Spacer,
  Button,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import { ModuleResponse } from "../../APIClients/types/CourseClientTypes";
import {
  LessonProgressResponse,
  ModuleProgress,
} from "../../APIClients/types/ProgressClientTypes";
import { LessonTitleResponse } from "../../APIClients/types/LessonClientTypes";

import { GET_LESSON_PROGRESS } from "../../APIClients/queries/ProgressQueries";
import { GET_LESSON_TITLES } from "../../APIClients/queries/LessonQueries";
import { COURSE_OVERVIEW_BASE_ROUTE } from "../../constants/Routes";

import AuthContext from "../../contexts/AuthContext";
import { Step, Steps } from "../common/steps";

type ModuleDropdownProps = {
  module: ModuleResponse;
  progress?: ModuleProgress;
  index: number;
  courseID: string;
};

enum ModuleStatus {
  NotStarted,
  InProgress,
  Complete,
}

const ModuleDropdown = ({
  module,
  progress,
  index,
  courseID,
}: ModuleDropdownProps): React.ReactElement => {
  const history = useHistory();
  const { authenticatedUser } = useContext(AuthContext);

  const {
    data: lessonData,
  }: { data?: { lessons: LessonTitleResponse[] } } = useQuery(
    GET_LESSON_TITLES,
    {
      variables: {
        ids: module?.lessons ?? [],
      },
    },
  );
  const {
    data: lessonProgressData,
  }: {
    data?: { lessonProgress: Record<number, LessonProgressResponse> };
  } = useQuery(GET_LESSON_PROGRESS, {
    variables: {
      userId: authenticatedUser?.id,
      lessonIds: module?.lessons ?? [],
    },
  });

  if (!lessonData?.lessons || lessonData.lessons.length === 0) return <></>;
  const lessonTitles = lessonData.lessons.reduce<{ [id: string]: string }>(
    (bucket, lesson) => ({ ...bucket, [lesson.id]: lesson.title }),
    {},
  );

  // Calculate how many completed lessons there are
  let latestCompletedLesson = -1;
  if (lessonProgressData && module.lessons) {
    latestCompletedLesson = Object.values(lessonProgressData.lessonProgress)
      .length;
    if (latestCompletedLesson === module.lessons.length) {
      latestCompletedLesson = module.lessons.length + 1;
    } else if (latestCompletedLesson === 0) {
      latestCompletedLesson = -1;
    }
  }

  let status = ModuleStatus.NotStarted;
  if (progress?.startedAt) status = ModuleStatus.InProgress;
  if (progress?.completedAt) status = ModuleStatus.Complete;

  const startModule = () => {
    history.push(`${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}/${index}`);
  };

  const getButtonText = () => {
    if (!authenticatedUser) {
      return "Sign up to view module";
    }
    if (!progress) {
      return "Start module";
    }
    if (progress.completedAt) {
      return "View module";
    }
    if (progress.startedAt) {
      return "Continue learning";
    }
    return "View module";
  };

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton
            paddingX="1rem"
            paddingY="1rem"
            borderTopRadius="6px"
            color="brand.royal"
            _expanded={{ bg: "brand.royal", color: "white" }}
          >
            <Flex w="100%" align="center">
              <Box w="30px">
                {status === ModuleStatus.InProgress && (
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.00001 12.5C3.00001 7.53125 7.03126 3.5 12 3.5C16.9688 3.5 21 7.53125 21 12.5C21 17.4687 16.9688 21.5 12 21.5C7.03126 21.5 3.00001 17.4687 3.00001 12.5Z"
                      stroke="#9861C9"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M12 3.5C7.03125 3.5 3 7.53125 3 12.5C3 17.4687 7.03125 21.5 12 21.5"
                      stroke="#F4F4F4"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                    />
                  </svg>
                )}
                {status === ModuleStatus.Complete && <CheckCircleIcon />}
              </Box>
              <Text variant="subheading">{`Module ${index + 1}: ${
                module.title
              }`}</Text>
              <Spacer />
              <Text variant="subheading">{`${module.lessons?.length} Lessons`}</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <Box
            border="1px"
            borderBottomRadius="6px"
            borderColor={isExpanded ? "brand.royal" : "background.lightgrey"}
            bg={isExpanded ? "#F9F7FB" : "white"}
          >
            <AccordionPanel px="2rem" py="2rem">
              <VStack align="left">
                {module.description && (
                  <Text pb="1rem">{module.description}</Text>
                )}
                <Text variant="subheading">Lessons</Text>
                <Steps currentStep={latestCompletedLesson}>
                  {module.lessons?.map((id, i) => (
                    <Step
                      label={`${i + 1}. ${lessonTitles[id]}`}
                      index={i}
                      key={i}
                    />
                  ))}
                </Steps>
                <Button
                  variant="sm"
                  w="fit-content"
                  paddingX="4rem"
                  onClick={startModule}
                >
                  {getButtonText()}
                </Button>
              </VStack>
            </AccordionPanel>
          </Box>
        </>
      )}
    </AccordionItem>
  );
};

export default ModuleDropdown;
