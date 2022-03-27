import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import {
  ContentTypeEnum,
  CourseType,
  LessonsType,
  ModuleEditorParams,
} from "../../types/ModuleEditorTypes";
import EditorContextReducer from "../../reducers/ModuleEditorContextReducer";
import EditorContext from "../../contexts/ModuleEditorContext";
import SideBar from "../module-editor/SideBar";
import LessonViewer from "../module-editor/LessonViewer";

const ModuleEditor = (): React.ReactElement => {
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();

  const [state, dispatch] = useReducer(EditorContextReducer, null);

  // Runs once at the beginning
  useEffect(() => {
    // TODO: Use courseID to get course document
    const dummyCourse: CourseType = {
      title: `Course ${courseID}`,
      description: "Hello",
      private: false,
      modules: [
        {
          id: "module-hash-1",
          title: "Hello!",
          description: `I am a module ${moduleIndex}`,
          image: "",
          previewImage: "",
          published: true,
          lessons: ["lesson-hash-1", "lesson-hash-2"],
        },
      ],
    };

    // TODO: Retrieve all lessons from the module
    const dummyLessons: LessonsType = {
      "lesson-hash-1": {
        course: "course-hash-1",
        module: "module-hash-1",
        title: "Dummy Lesson 1",
        description: "Blah",
        image: "",
        content: [
          {
            type: ContentTypeEnum.TEXT,
            content: {
              text: "Hello!",
            },
          },
          {
            type: ContentTypeEnum.IMAGE,
            content: {
              link:
                "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
            },
          },
          {
            type: ContentTypeEnum.TEXT,
            content: {
              text: "Yup!",
            },
          },
        ],
      },
      "lesson-hash-2": {
        course: "course-hash-1",
        module: "module-hash-1",
        title: "Dummy Lesson 2",
        description: "Blah",
        image: "",
        content: [
          {
            type: ContentTypeEnum.TEXT,
            content: {
              text: "Welcome to lesson 2!",
            },
          },
        ],
      },
    };

    // TODO: Safely select a lesson in focus (or null if none exist)
    const dummyfocusedLesson = Object.keys(dummyLessons)[0];

    // Save to context
    dispatch({
      type: "init",
      value: {
        course: dummyCourse,
        lessons: dummyLessons,
        focusedLesson: dummyfocusedLesson,
        hasChanged: false,
      },
    });
  }, [courseID, moduleIndex]);

  if (state) {
    if (state.course.modules[parseInt(moduleIndex, 10)] === undefined) {
      return <p>Module not found!</p>;
    }

    return (
      <EditorContext.Provider value={{ state, dispatch }}>
        <Flex>
          <SideBar />
          <LessonViewer />
        </Flex>
      </EditorContext.Provider>
    );
  }

  // TODO: Better course fallback
  return <div>Course not found!</div>;
};

export default ModuleEditor;
