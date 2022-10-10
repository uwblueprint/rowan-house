import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import {
  Center,
  Box,
  Flex,
  IconButton,
  Spinner,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { GET_COURSE } from "../../APIClients/queries/CourseQueries";
import GET_LESSONS from "../../APIClients/queries/LessonQueries";

import {
  EditorContextAction,
  LessonsType,
  ModuleEditorParams,
} from "../../types/ModuleEditorTypes";
import EditorContextReducer from "../../reducers/ModuleEditorContextReducer";
import EditorContext from "../../contexts/ModuleEditorContext";
import SideBar from "./SideBar";
import LessonViewer from "./LessonViewer";
import ModuleCompleted from "./ModuleCompleted";
import Banner from "../learner/Banner";
import { LessonResponse } from "../../APIClients/types/LessonClientTypes";
import { formatLessonResponse } from "../../utils/lessonUtils";
import { useURLSearchFlag } from "../../hooks/useURLSearch";
import {
  MARK_MODULE_AS_STARTED,
  MARK_MODULE_AS_COMPLETED,
  MARK_LESSON_AS_COMPLETED,
} from "../../APIClients/mutations/ProgressMutations";
import AuthContext from "../../contexts/AuthContext";
import { ColumnBlockInvalidChildren } from "../../types/ContentBlockTypes";
import {
  GET_LESSON_PROGRESS,
  GET_MODULE_PROGRESS,
} from "../../APIClients/queries/ProgressQueries";
import { LessonProgressResponse } from "../../APIClients/types/ProgressClientTypes";

// Copy drag implementation based on https://github.com/atlassian/react-beautiful-dnd/issues/216#issuecomment-423708497
const onDragEnd = (
  dispatch: React.Dispatch<EditorContextAction>,
  result: DropResult,
  toast: (options: UseToastOptions) => number | string | undefined,
) => {
  const { source, destination } = result;
  // dropped outside the list
  if (!destination || result.type === "MATCH") {
    return;
  }

  if (destination.droppableId.includes("COLUMN")) {
    const [columnID, columnSide] = destination.droppableId.split(" ");
    if (columnSide !== "left" && columnSide !== "right") {
      throw Error(`Received column component with unknown side: ${columnSide}`);
    }
    // If the block is not meant to go into the column, show an error and cancel the drag
    const [blockType] = result.draggableId.split(" ");
    if (ColumnBlockInvalidChildren.includes(blockType)) {
      toast({
        title: "Invalid component",
        description: "This component cannot be used in a column layout",
        status: "error",
        position: "top",
        isClosable: true,
      });
      return;
    }
    switch (source.droppableId) {
      case "KIOSK":
        dispatch({
          type: "create-block-in-column",
          value: { blockID: result.draggableId, columnID, columnSide },
        });
        break;
      case "EDITOR":
        dispatch({
          type: "move-block-to-column",
          value: { index: source.index, columnID, columnSide },
        });
        break;
      default:
        throw Error("Drag & drop error: invalid drag involving a column");
    }
    return;
  }

  switch (source.droppableId) {
    case destination.droppableId:
      dispatch({
        type: "reorder-blocks",
        value: {
          oldIndex: source.index,
          newIndex: destination.index,
        },
      });
      break;
    case "KIOSK":
      dispatch({
        type: "create-block",
        value: {
          blockID: result.draggableId,
          index: destination.index,
        },
      });
      break;
    default:
      throw Error("Unknown drag & drop source/destination");
  }
};

const ModuleViewer = ({
  editable,
}: {
  editable: boolean;
}): React.ReactElement => {
  const {
    courseID,
    moduleIndex: moduleIndexString,
  }: ModuleEditorParams = useParams();
  const moduleIndex = Number(moduleIndexString);
  const { authenticatedUser } = useContext(AuthContext);
  const [completed, setCompleted] = useURLSearchFlag("completed");
  const toast = useToast();

  const [state, dispatch] = useReducer(EditorContextReducer, null);
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const { data: courseData } = useQuery(GET_COURSE, {
    variables: {
      id: courseID,
    },
  });
  const [getLessons, { data: lessonData }] = useLazyQuery(GET_LESSONS);
  const [getProgressData, { data: lessonProgressData }] = useLazyQuery(
    GET_LESSON_PROGRESS,
  );
  const [markModuleAsCompletedForUser] = useMutation(MARK_MODULE_AS_COMPLETED, {
    refetchQueries: [{ query: GET_MODULE_PROGRESS }],
  });
  const [markLessonAsCompletedForUser] = useMutation(MARK_LESSON_AS_COMPLETED, {
    refetchQueries: [{ query: GET_LESSON_PROGRESS }],
  });
  const [markModuleAsStartedForUser] = useMutation(MARK_MODULE_AS_STARTED, {
    refetchQueries: [{ query: GET_MODULE_PROGRESS }],
  });

  useEffect(() => {
    if (!editable) {
      markModuleAsStartedForUser({
        variables: {
          userId: authenticatedUser?.id,
          courseId: courseID,
          moduleIndex,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseID, moduleIndex]);

  useEffect(() => {
    const fetchLessons = async () => {
      const module = courseData?.course.modules[moduleIndex];
      if (courseData) {
        // Save to context
        const { data: lessonRes } = await getLessons({
          variables: { ids: module.lessons },
        });
        const { data: lessonProgressRes } = await getProgressData({
          variables: {
            userId: authenticatedUser?.id,
            lessonIds: lessonRes.lessons.map(
              (lesson: LessonResponse) => lesson?.id,
            ),
          },
        });
        const completedLessons =
          lessonProgressRes?.lessonProgress.filter(
            (lesson: LessonProgressResponse) => !!lesson.completedAt,
          ) || [];
        const completedLessonIds = new Set<string>(
          completedLessons.map(
            (lesson: LessonProgressResponse) => lesson.lessonId,
          ),
        );
        if (!editable) {
          dispatch({
            type: "set-focus",
            value:
              module.lessons[
                Math.min(completedLessonIds.size, lessonRes.lessons.length - 1)
              ],
          });
        }

        dispatch({
          type: "set-completed-lessons",
          value: completedLessonIds,
        });
      }
    };
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseData, getLessons, moduleIndex]);

  useEffect(() => {
    if (courseData && lessonData) {
      const lessonsObj: LessonsType = {};

      lessonData.lessons.forEach((lesson: LessonResponse) => {
        lessonsObj[lesson.id] = formatLessonResponse(lesson);
      });
      dispatch({
        type: "init",
        value: {
          course: courseData.course,
          lessons: lessonsObj,
          focusedLesson: completed
            ? null
            : courseData.course.modules[moduleIndex].lessons[0],
          newBlock: null,
          hasChanged: {},
          completedLessons: new Set(),
        },
      });
    }
  }, [courseData, lessonProgressData, moduleIndex, lessonData, completed]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const renderModuleViewer = () => {
    if (!state) return <></>;
    const sideBarIcon = showSideBar ? (
      <ChevronLeftIcon />
    ) : (
      <ChevronRightIcon />
    );
    return (
      <Flex h="100vh">
        <Box position="relative">
          {showSideBar ? (
            <SideBar
              editable={editable}
              onLessonSelected={() => setCompleted(false)}
            />
          ) : null}
          <Flex
            height="100%"
            position="absolute"
            right="-20px"
            zIndex="1000"
            align="center"
            justify="center"
          >
            <IconButton
              aria-label="Show sideBar"
              borderRadius="0"
              bg="white"
              color="black"
              size="s"
              w="20px"
              h="45px"
              onClick={() => setShowSideBar(!showSideBar)}
            >
              {sideBarIcon}
            </IconButton>
          </Flex>
        </Box>
        <Flex direction="column" flex="1" height="100%">
          {!editable && <Banner asBlock />}
          <Box overflow="auto" height="100%" ref={scrollRef}>
            {completed && !editable ? (
              <ModuleCompleted />
            ) : (
              <LessonViewer
                editable={editable}
                onLessonCompleted={(lessonId) => {
                  const { lessons } = state.course.modules[moduleIndex];
                  const lessonIndex = lessons.indexOf(lessonId);
                  if (lessonIndex === lessons.length - 1) {
                    setCompleted(true);
                    markModuleAsCompletedForUser({
                      variables: {
                        userId: authenticatedUser?.id,
                        courseId: courseID,
                        moduleIndex,
                      },
                    });
                    dispatch({ type: "set-focus", value: null });
                  } else if (lessonIndex !== -1) {
                    dispatch({
                      type: "set-focus",
                      value: lessons[lessonIndex + 1],
                    });
                  }
                  // In case the browser doesn't do it automatically.
                  markLessonAsCompletedForUser({
                    variables: {
                      userId: authenticatedUser?.id,
                      lessonId,
                    },
                  });
                  const newCompleted = new Set(state.completedLessons);
                  newCompleted.add(lessonId);
                  dispatch({
                    type: "set-completed-lessons",
                    value: newCompleted,
                  });
                  scrollRef.current?.scrollTo(0, 0);
                }}
              />
            )}
          </Box>
        </Flex>
      </Flex>
    );
  };

  if (state) {
    if (state.course.modules[moduleIndex] === undefined) {
      return <p>Module not found!</p>;
    }
    // Only include Drag Drop Context if the viewer is editable
    if (editable) {
      return (
        <EditorContext.Provider value={{ state, dispatch }}>
          <DragDropContext
            onDragEnd={(result: DropResult) =>
              onDragEnd(dispatch, result, toast)
            }
          >
            {renderModuleViewer()}
          </DragDropContext>
        </EditorContext.Provider>
      );
    }

    return (
      <EditorContext.Provider value={{ state, dispatch }}>
        {renderModuleViewer()}
      </EditorContext.Provider>
    );
  }

  // TODO: Better course fallback
  return (
    <Center>
      <Spinner />
    </Center>
  );
};

export default ModuleViewer;
