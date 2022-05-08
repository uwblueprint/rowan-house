import { v4 as uuid } from "uuid";

import {
  EditorContextAction,
  EditorStateType,
  LessonType,
  ContentType,
  ContentTypeEnum,
} from "../types/ModuleEditorTypes";

/* eslint-disable no-console */

// Helper functions for editing a lesson's contents
const createLesson = (
  state: EditorStateType,
  lesson: LessonType,
): EditorStateType => {
  // Create deep copy of state
  const newState = JSON.parse(JSON.stringify(state));
  const moduleIndex = state.course.modules.findIndex(
    (module) => module.id === lesson.module,
  );
  // Check to make sure moduleID exists
  console.assert(moduleIndex !== -1, `Invalid moduleID ${lesson.module}`);
  // TODO: Generate a new ID for the lesson and ensure no duplicates
  const lessonID = lesson.title;
  // Create the new lesson object
  newState.lessons[lessonID] = lesson;
  // Add the lesson ID to the modules
  // TODO: Object.keys does not guarantee order - fix in the future
  newState.course.modules[moduleIndex].lessons = Object.keys(newState.lessons);
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
  blockID: string,
  index: number,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || !Object.keys(state.lessons).includes(id)) return state; //  || !Object.keys(state.lessons).includes(id)

  console.assert(index >= 0, "Content block index must be positive");
  console.assert(
    index <= state.lessons[id].content.length,
    "Content block index exceeds content length",
  );

  let block: ContentType | null;
  switch (blockID) {
    case ContentTypeEnum.TEXT.id:
      block = {
        type: ContentTypeEnum.TEXT,
        id: uuid(),
        content: {
          text: "Hello!",
        },
      };
      break;
    case ContentTypeEnum.IMAGE.id:
      block = {
        type: ContentTypeEnum.IMAGE,
        id: uuid(),
        content: {
          link:
            "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        },
      };
      break;
    default:
      throw Error("Invalid block id");
  }
  const newState = { ...state };
  newState.lessons[id].content.splice(index, 0, block);
  return newState;
};

const reorderLessonContentBlocks = (
  state: EditorStateType,
  oldIndex: number,
  newIndex: number,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || !Object.keys(state.lessons).includes(id)) return state;

  console.assert(oldIndex >= 0, "Content block index must be positive");
  console.assert(
    oldIndex < state.lessons[id].content.length,
    "Content block index exceeds content length",
  );
  console.assert(newIndex >= 0, "Content block index must be positive");
  console.assert(
    newIndex < state.lessons[id].content.length,
    "Content block index exceeds content length",
  );

  const newState = { ...state };
  const [block] = newState.lessons[id].content.splice(oldIndex, 1);
  newState.lessons[id].content.splice(newIndex, 0, block);
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
  // let newState = { ...state, hasChanged: true };
  let newState = { ...state};

  switch (action.type) {
    case "set-focus":
      return {
        ...newState,
        focusedLesson: action.value,
      };
    case "create-lesson": 
      newState = {...state, hasChanged: {...state.hasChanged, [action.value.title]: "CREATE"}}
      console.log(newState)
      return createLesson(newState, action.value);
    case "update-lesson":
      if (newState.focusedLesson) {
        newState = {...state, hasChanged: {...state.hasChanged, [newState.focusedLesson]: "UPDATE"}}
      }
      return updateLesson(newState, action.value);
    case "delete-lesson":
      newState = {...state, hasChanged: {...state.hasChanged, [action.value]: "DELETE"}}
      return deleteLesson(newState, action.value);
    case "create-block":
      if (newState.focusedLesson) {
        newState = {...state, hasChanged: {...state.hasChanged, [newState.focusedLesson]: "UPDATE"}}
      }
      return createLessonContentBlock(
        newState,
        action.value.blockID,
        action.value.index,
      );
    case "reorder-blocks":
      if (newState.focusedLesson) {
        newState = {...state, hasChanged: {...state.hasChanged, [newState.focusedLesson]: "UPDATE"}}
      }
      return reorderLessonContentBlocks(
        newState,
        action.value.oldIndex,
        action.value.newIndex,
      );
    case "update-block":
      if (newState.focusedLesson) {
        newState = {...state, hasChanged: {...state.hasChanged, [newState.focusedLesson]: "UPDATE"}}
      }
      return updateLessonContentBlock(
        newState,
        action.value.index,
        action.value.block,
      );
    case "delete-block":
      if (newState.focusedLesson) {
        newState = {...state, hasChanged: {...state.hasChanged, [newState.focusedLesson]: "UPDATE"}}
      }
      return deleteLessonContentBlock(newState, action.value);
    default:
      return state;
  }
}
