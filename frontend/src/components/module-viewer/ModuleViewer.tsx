import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Center, Box, Flex, IconButton, Spinner } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { useQuery, useLazyQuery } from "@apollo/client";
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

  if (destination.droppableId.includes("column")) {
    const [columnID, columnSide] = destination.droppableId.split(" ");
    if (columnSide !== "left" && columnSide !== "right") {
      throw Error(`Received column component with unknown side: ${columnSide}`);
    }

    switch (source.droppableId) {
      case "KIOSK":
        dispatch({
          type: "create-column-block",
          value: { blockID: result.draggableId, columnID, columnSide },
        });
        break;
      case "EDITOR":
        break;
      // TODO: From another column ?
      default:
        throw Error("Column Error");
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
  const [completed, setCompleted] = useURLSearchFlag("completed");

  const [state, dispatch] = useReducer(EditorContextReducer, null);
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const { data: courseData } = useQuery(GET_COURSE, {
    variables: {
      id: courseID,
    },
  });
  const [getLessons, { data: lessonData }] = useLazyQuery(GET_LESSONS);

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
          hasChanged: {},
        },
      });
    }
  }, [courseData, moduleIndex, lessonData, completed]);

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
                      // TODO save progress on backend

                      const { lessons } = state.course.modules[moduleIndex];
                      const lessonIndex = lessons.indexOf(lessonId);
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
