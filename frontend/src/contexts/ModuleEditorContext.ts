import { createContext } from "react";
import { Content, LessonProps, LessonsProps } from "../types/ModuleEditorTypes";

// Helper functions for editing a lesson's contents
export const EditLesson = {
  updateLessonAttributes: (
    lessons: LessonsProps,
    id: string,
    lesson: LessonProps,
  ): LessonsProps => {
    const newLessons = { ...lessons };
    newLessons[id] = { ...lessons[id], ...lesson };
    return newLessons;
  },
  updateLessonName: (
    lessons: LessonsProps,
    id: string,
    title: string,
  ): LessonsProps => {
    const newLessons = { ...lessons };
    newLessons[id].title = title;
    return newLessons;
  },
  updateLessonContentBlock: (
    lessons: LessonsProps,
    id: string,
    index: number,
    block: Content,
  ): LessonsProps => {
    console.assert(index >= 0, "Content block index must be positive");
    console.assert(
      index < lessons[id].content.length,
      "Content block index exceeds content length",
    );

    const newLessons = { ...lessons };
    newLessons[id].content[index] = block;
    return newLessons;
  },
  createLessonContentBlock: (
    lessons: LessonsProps,
    id: string,
    index: number,
    block: Content,
  ): LessonsProps => {
    console.assert(index >= 0, "Content block index must be positive");
    console.assert(
      index <= lessons[id].content.length,
      "Content block index exceeds content length",
    );

    const newLessons = { ...lessons };
    newLessons[id].content = lessons[id].content.splice(index, 0, block);
    return newLessons;
  },
};

interface EditorContextProps {
  focusedLesson: string | null;
  lessons: LessonsProps;
  setLessons: (_newLessons: LessonsProps) => void;
  setFocusedLesson: (_key: string) => void;
}

const lessons: EditorContextProps = {
  focusedLesson: null,
  lessons: {},
  setLessons: (_newLessons: LessonsProps) => {},
  setFocusedLesson: (_key: string) => {},
};

export const EditorContext = createContext(lessons);
