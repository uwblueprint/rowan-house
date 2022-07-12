import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { Center, Flex, IconButton, Spinner } from "@chakra-ui/react";
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
import { LessonResponse } from "../../APIClients/types/LessonClientTypes";
import { formatLessonResponse } from "../../utils/lessonUtils";

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
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();

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
          focusedLesson: courseData.course.modules[moduleIndex].lessons[0],
          hasChanged: {},
        },
      });
    }
  }, [courseData, moduleIndex, lessonData]);

  if (state) {
    if (state.course.modules[parseInt(moduleIndex, 10)] === undefined) {
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
            {showSideBar ? <SideBar /> : null}
            <IconButton
              aria-label="Show sideBar"
              borderRadius="0"
              bg="white"
              color="black"
              alignSelf="center"
              size="s"
              w="20px"
              height="45px"
              onClick={() => setShowSideBar(!showSideBar)}
            >
              {sideBarIcon}
            </IconButton>
            <LessonViewer />
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
