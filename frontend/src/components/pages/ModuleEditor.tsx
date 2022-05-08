import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, IconButton } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_COURSE } from '../../APIClients/queries/CourseQueries';
import GET_LESSONS from '../../APIClients/queries/LessonQueries';

import {
  ContentTypeEnum,
  CourseType,
  EditorContextAction,
  LessonsType,
  ModuleEditorParams,
} from "../../types/ModuleEditorTypes";
import EditorContextReducer from "../../reducers/ModuleEditorContextReducer";
import EditorContext from "../../contexts/ModuleEditorContext";
import SideBar from "../module-editor/SideBar";
import LessonViewer from "../module-editor/LessonViewer";

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

const ModuleEditor = (): React.ReactElement => {
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();

  const [state, dispatch] = useReducer(EditorContextReducer, null);
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const {loading: courseLoading, error: courseError, data: courseData, refetch: courseRefetch} = useQuery(GET_COURSE, {
    variables: {
      id: courseID
    }
  });
  const [getLessons, {loading: lessonLoading, error: lessonError, data: lessonData}] = useLazyQuery(GET_LESSONS);

  // Runs once at the beginning
  useEffect(() => {
    // Leaving dummy courses here as they're useful for development
    // const dummyCourse: CourseType = {
    //   title: `Course ${courseID}`,
    //   description: "Hello",
    //   private: false,
    //   modules: [
    //     {
    //       id: "module-hash-1",
    //       title: "Hello!",
    //       description: `I am a module ${moduleIndex}`,
    //       image: "",
    //       previewImage:
    //         "https://res.cloudinary.com/practicaldev/image/fetch/s--JIe3p0M4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/093ewdrgyf1kedlhzs51.png",
    //       published: true,
    //       lessons: ["lesson-hash-1", "lesson-hash-2"],
    //     },
    //   ],
    // };

    // const dummyLessons: LessonsType = {
    //   "lesson-hash-1": {
    //     course: "course-hash-1",
    //     module: "module-hash-1",
    //     title: "Dummy Lesson 1",
    //     description: "Blah",
    //     image: "",
    //     content: [
    //       {
    //         type: ContentTypeEnum.TEXT,
    //         id: uuid(),
    //         content: {
    //           text: "Hello!",
    //         },
    //       },
    //       {
    //         type: ContentTypeEnum.IMAGE,
    //         id: uuid(),
    //         content: {
    //           link:
    //             "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    //         },
    //       },
    //       {
    //         type: ContentTypeEnum.TEXT,
    //         id: uuid(),
    //         content: {
    //           text: "Yup!",
    //         },
    //       },
    //     ],
    //   },
    //   "lesson-hash-2": {
    //     course: "course-hash-1",
    //     module: "module-hash-1",
    //     title: "Dummy Lesson 2",
    //     description: "Blah",
    //     image: "",
    //     content: [
    //       {
    //         type: ContentTypeEnum.TEXT,
    //         id: uuid(),
    //         content: {
    //           text: "Welcome to lesson 2!",
    //         },
    //       },
    //     ],
    //   },
    // };

    // const dummyfocusedLesson = Object.keys(dummyLessons)[0];

    if (courseData) {
      // Save to context
      getLessons({variables: {ids: courseData.course.modules[moduleIndex].lessons}})
    }
  }, [courseData]);

  useEffect(() => {
    if (courseData && lessonData) {
      const lessonsObj: LessonsType = {}

      lessonData.lessonsByIds.forEach((lesson: any) => {
        const lessonObj = {
          ...lesson
        }
        delete lessonObj.id;

        lessonsObj[lesson.id] = lessonObj
      })
      dispatch({
        type: "init",
        value: {
          course: courseData.course,
          lessons: lessonsObj,
          focusedLesson: lessonData.lessonsByIds[0],
          hasChanged: {}
        },
      });
    }
  }, [courseData, lessonData])

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
  return <div>Course not found!</div>;
};

export default ModuleEditor;
