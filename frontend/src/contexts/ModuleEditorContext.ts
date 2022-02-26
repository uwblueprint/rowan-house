import { createContext } from "react";
import { ContentType, LessonProps } from "../types/ModuleEditorTypes";

export const dummyLesson: LessonProps = {
  course: "",
  module: "",
  title: "Dummy Lesson",
  description: "Blah",
  image: "",
  content: [
    {
      type: ContentType.text,
      content: {
        text: "Hello!",
      },
    },
    {
      type: ContentType.image,
      content: {
        link:
          "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      },
    },
    {
      type: ContentType.text,
      content: {
        text: "Yup!",
      },
    },
  ],
};

const lesson = {
  lesson: dummyLesson,
  setLesson: (newLesson: LessonProps) => newLesson,
};

export const EditorContext = createContext(lesson);
