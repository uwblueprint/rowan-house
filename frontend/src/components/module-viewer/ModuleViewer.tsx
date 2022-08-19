import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  useContext,
} from "react";
import { useParams } from "react-router-dom";
import { Center, Box, Flex, IconButton, Spinner } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_COURSE } from "../../APIClients/queries/CourseQueries";
import GET_LESSONS from "../../APIClients/queries/LessonQueries";
import { MARK_LESSON_AS_COMPLETED } from "../../APIClients/mutations/ProgressMutations";
import { GET_LESSON_PROGRESS } from "../../APIClients/queries/ProgressQueries";

import {
  EditorContextAction,
  LessonsType,
  ModuleEditorParams,
} from "../../types/ModuleEditorTypes";
import EditorContextReducer from "../../reducers/ModuleEditorContextReducer";
import EditorContext from "../../contexts/ModuleEditorContext";
import AuthContext from "../../contexts/AuthContext";
import SideBar from "./SideBar";
import LessonViewer from "./LessonViewer";
import ModuleCompleted from "./ModuleCompleted";
import Banner from "../learner/Banner";
import { LessonResponse } from "../../APIClients/types/LessonClientTypes";
import { formatLessonResponse } from "../../utils/lessonUtils";
import { useURLSearchFlag } from "../../hooks/useURLSearch";

// Copy drag implementation based on https://github.com/atlassian/react-beautiful-dnd/issues/216#issuecomment-423708497
const onDragEnd = (
  dispatch: React.Dispatch<EditorContextAction>,
  result: DropResult,
) => {
  const { source, destination } = result;
  // dropped outside the list
  if (!destination) {
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
  const [completed, setCompleted] = useURLSearchFlag("completed");
  const { authenticatedUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(EditorContextReducer, null);
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const { data: courseData } = useQuery(GET_COURSE, {
    variables: {
      id: courseID,
    },
  });
  const [getLessons, { data: lessonData }] = useLazyQuery(GET_LESSONS);
  const [getLessonProgress, { data: lessonProgressData }] = useLazyQuery(
    GET_LESSON_PROGRESS,
  );

  const [updateLessonProgress] = useMutation(MARK_LESSON_AS_COMPLETED);

  useEffect(() => {
    if (courseData) {
      // Save to context
      getLessons({
        variables: { ids: courseData.course.modules[moduleIndex].lessons },
      });
    }
  }, [courseData, getLessons, moduleIndex]);

  useEffect(() => {
    if (courseData && lessonData) {
      const lessonsObj: LessonsType = {};

      getLessonProgress({
        variables: {
          userId: authenticatedUser?.id,
          lessonIds: courseData.course.modules[moduleIndex].lessons,
        },
      });
      console.log(lessonProgressData);
      const lastCompletedLessonId = lessonProgressData
        ? lessonProgressData.lessonProgress.slice(-1)[0].lessonId
        : 0; // get last completed element

      const { lessons } = courseData.course.modules[moduleIndex];
      const lastCompletedLessonIndex = lessons.indexOf(lastCompletedLessonId);
      console.log(lessons);
      console.log("LAST COMPLETED", lessons[lastCompletedLessonIndex]);
      lessonData.lessons.forEach((lesson: LessonResponse) => {
        lessonsObj[lesson.id] = formatLessonResponse(lesson);
      });
      console.log(completed);
      dispatch({
        type: "init",
        value: {
          course: courseData.course,
          lessons: lessonsObj,
          focusedLesson: completed
            ? null
            : lessons[lastCompletedLessonIndex + 1],
          hasChanged: {},
        },
      });
      dispatch({
        type: "set-focus",
        value: completed ? null : lessons[lastCompletedLessonIndex + 1],
      });
    }
  }, [
    courseData,
    moduleIndex,
    lessonData,
    completed,
    lessonProgressData,
    getLessonProgress,
    authenticatedUser?.id,
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (state) {
    if (state.course.modules[moduleIndex] === undefined) {
      return <p>Module not found!</p>;
    }

    const sideBarIcon = showSideBar ? (
      <ChevronLeftIcon />
    ) : (
      <ChevronRightIcon />
    );
    return (
      <EditorContext.Provider value={{ state, dispatch }}>
        <Flex h="100vh">
          <DragDropContext onDragEnd={(result) => onDragEnd(dispatch, result)}>
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
                      // save progress on backend
                      updateLessonProgress({
                        variables: {
                          userId: authenticatedUser?.id,
                          lessonId,
                        },
                      });
                      if (lessonIndex === lessons.length - 1) {
                        setCompleted(true);
                        dispatch({ type: "set-focus", value: null });
                      } else if (lessonIndex !== -1) {
                        dispatch({
                          type: "set-focus",
                          value: lessons[lessonIndex + 1],
                        });
                      }

                      // In case the browser doesn't do it automatically.
                      scrollRef.current?.scrollTo(0, 0);
                    }}
                  />
                )}
              </Box>
            </Flex>
          </DragDropContext>
        </Flex>
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
