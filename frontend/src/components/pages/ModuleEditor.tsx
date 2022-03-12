import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import {
  ContentType,
  LessonProps,
  CourseProps,
  ModuleProps,
  LessonsProps,
} from "../../types/ModuleEditorTypes";
import { EditorContext } from "../../contexts/ModuleEditorContext";
import SideBar from "../module-editor/SideBar";
import LessonViewer from "../module-editor/LessonViewer";

const ModuleEditor = (): React.ReactElement => {
  const {
    courseID,
    moduleID,
  }: { courseID: string; moduleID: string } = useParams();

  const [lessons, setLessons] = useState<Record<string, LessonProps>>({});
  const [focusedLesson, setFocusedLesson] = useState<string | null>(null);
  const [course, setCourse] = useState<CourseProps | null>(null);

  // TODO: Use courseID to get course document
  const dummyCourse: CourseProps = {
    title: `Course ${courseID}`,
    description: "Hello",
    private: false,
    modules: {
      "module-hash-1": {
        title: "Hello!",
        description: `I am a module ${moduleID}`,
        image: "",
        previewImage: "",
        published: true,
        lessons: ["lesson-hash-1", "lesson-hash-2"],
      },
    },
  };

  // TODO: Retrieve a lesson (should be the first lesson if none is specified)
  const dummyLessons: LessonsProps = {
    "lesson-hash-1": {
      course: "",
      module: "",
      title: "Dummy Lesson 1",
      description: "Blah",
      image: "",
      content: [
        {
          type: ContentType.TEXT,
          content: {
            text: "Hello!",
          },
        },
        {
          type: ContentType.IMAGE,
          content: {
            link:
              "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
          },
        },
        {
          type: ContentType.TEXT,
          content: {
            text: "Yup!",
          },
        },
      ],
    },
    "lesson-hash-2": {
      course: "",
      module: "",
      title: "Dummy Lesson 2",
      description: "Blah",
      image: "",
      content: [
        {
          type: ContentType.TEXT,
          content: {
            text: "Welcome to lesson 2!",
          },
        },
      ],
    },
  };

  const dummyfocusedLesson = Object.keys(dummyLessons)[0];
  
  // Run once at the beginning
  useEffect(() => {
    setCourse(dummyCourse);
    setLessons(dummyLessons);
    setFocusedLesson(dummyfocusedLesson);
  }, []);

  // Simplification
  const setModule = (newModule: ModuleProps) => {
    if (course) {
      const newCourse = { ...course };
      newCourse.modules[moduleID] = newModule;
      setCourse(newCourse);
    } else {
      throw new Error(
        "Course object must exist before trying to edit a module",
      );
    }
  };

  if (course) {
    if (course.modules[moduleID] === undefined) {
      return <p>Module not found!</p>;
    }

    return (
      <EditorContext.Provider
        value={{ focusedLesson, setFocusedLesson, lessons, setLessons }}
      >
        <Flex>
          <SideBar module={course.modules[moduleID]} setModule={setModule} />
          <LessonViewer />
        </Flex>
      </EditorContext.Provider>
    );
  }

  // TODO: Better course fallback
  return <div>Course not found!</div>;
};

export default ModuleEditor;
