import {
  EditorContextAction,
  EditorStateType,
  LessonType,
  ContentType,
} from "../types/ModuleEditorTypes";

/* eslint-disable no-console */

// Helper functions for editing a lesson's contents
const createLesson = (
  state: EditorStateType,
  lesson: LessonType,
): EditorStateType => {
  const newState = { ...state };
  const moduleIndex = state.course.modules.findIndex((module) => module.id === lesson.module)
  // Check to make sure moduleID exists
  console.assert(moduleIndex !== -1, `Invalid moduleID ${lesson.module}`);
  // TODO: Generate a new ID for the lesson and ensure no duplicates
  const lessonID = lesson.title;
  // Create the new lesson object
  newState.lessons[lessonID] = lesson;
  // Add the lesson ID to the modules
  // TODO: Object.keys does not guarantee order - fix in the future
  newState.course.modules[moduleIndex].lessons = Object.keys(
    newState.lessons,
  );
  // Focus on new lesson
  newState.focusedLesson = lessonID;
  return newState;
};

const updateLesson = (
  state: EditorStateType,
  lesson: LessonType,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || Object.keys(state.lessons).includes(id)) return state;

  const newState = { ...state };
  newState.lessons[id] = { ...state.lessons[id], ...lesson };
  return newState;
};

const deleteLesson = (state: EditorStateType, id: string) => {
  if (Object.keys(state.lessons).includes(id)) return state;

  const newState = { ...state };
  delete newState.lessons[id];
  // TODO: Remove lesson from module
  // TODO: If focused lesson is the lesson to delete, change focused lesson
  return newState;
};

const createLessonContentBlock = (
  state: EditorStateType,
  index: number,
  block: ContentType,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || Object.keys(state.lessons).includes(id)) return state;

  console.assert(index >= 0, "Content block index must be positive");
  console.assert(
    index <= state.lessons[id].content.length,
    "Content block index exceeds content length",
  );

  const newState = { ...state };
  newState.lessons[id].content.splice(index, 0, block);
  return newState;
};

const updateLessonContentBlock = (
  state: EditorStateType,
  index: number,
  block: ContentType,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || Object.keys(state.lessons).includes(id)) return state;

  console.assert(index >= 0, "Content block index must be positive");
  console.assert(
    index < state.lessons[id].content.length,
    "Content block index exceeds content length",
  );

  const newState = { ...state };
  newState.lessons[id].content[index] = block;
  return newState;
};

const deleteLessonContentBlock = (
  state: EditorStateType,
  index: number,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || Object.keys(state.lessons).includes(id)) return state;

  console.assert(index >= 0, "Content block index must be positive");
  console.assert(
    index < state.lessons[id].content.length,
    "Content block index exceeds content length",
  );

  const newState = { ...state };
  newState.lessons[id].content.splice(index, 1);
  return newState;
};

// Using tools such as immer might help with this process.
export default function EditorContextReducer(
  state: EditorStateType | null,
  action: EditorContextAction,
): EditorStateType | null {
  if (!state) {
    if (action.type === "init") return { ...action.value };
    return state;
  }

  // Update changed boolean
  // ! Currently triggers on set-focus change which is incorrect
  const newState = { ...state, hasChanged: true };

  switch (action.type) {
    case "set-focus":
      return {
        ...newState,
        focusedLesson: action.value,
      };
    case "create-lesson":
      return createLesson(newState, action.value);
    case "update-lesson":
      return updateLesson(newState, action.value);
    case "delete-lesson":
      return deleteLesson(newState, action.value);
    case "create-lesson-block":
      return createLessonContentBlock(
        newState,
        action.value.index,
        action.value.block,
      );
    case "update-lesson-block":
      return updateLessonContentBlock(
        newState,
        action.value.index,
        action.value.block,
      );
    case "delete-lesson-block":
      return deleteLessonContentBlock(newState, action.value);
    default:
      return state;
  }
}
