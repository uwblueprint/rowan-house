import { v4 as uuid } from "uuid";
import {
  EditorContextAction,
  EditorStateType,
  LessonType,
  EditorChangeStatus,
  EditorChangeStatuses,
} from "../types/ModuleEditorTypes";
import { ContentBlockState, ContentTypeEnum } from "../types/ContentBlockTypes";

/* eslint-disable no-console */

const updateChangeStatus = (
  hasChanged: EditorChangeStatuses,
  docID: string,
  status: EditorChangeStatus,
): EditorChangeStatuses => {
  // extra logic to make DELETE work
  if (
    status === "DELETE" &&
    docID in hasChanged &&
    hasChanged[docID] === "CREATE"
  ) {
    const newHasChanged = hasChanged;
    delete newHasChanged[docID];
    return newHasChanged;
  }
  if (!(docID in hasChanged)) return { ...hasChanged, [docID]: status };
  return hasChanged;
};

// Helper functions for editing a lesson's contents
const createLesson = (
  state: EditorStateType,
  lesson: LessonType,
  moduleIndex: number,
): EditorStateType => {
  // Create deep copy of state since state properties are readonly
  // TODO: This is dangerous, we should use immutable ways to edit this data
  const newState = JSON.parse(JSON.stringify(state));
  // Check to make sure moduleID exists
  console.assert(moduleIndex !== -1, `Invalid moduleID ${lesson.module}`);
  // Temporary lesson that is used until save
  const lessonID = uuid();
  // Create the new lesson object
  newState.lessons = { ...state.lessons, [lessonID]: lesson };
  // Add the lesson ID to the modules
  // TODO: Object.keys does not guarantee order - fix in the future
  newState.course.modules[moduleIndex].lessons = Object.keys(newState.lessons);
  // Focus on new lesson
  newState.focusedLesson = lessonID;
  // Update to let the state know things have changed
  newState.hasChanged = updateChangeStatus(
    state.hasChanged,
    lessonID,
    "CREATE",
  );
  return newState;
};

const updateLesson = (
  state: EditorStateType,
  lesson: Partial<LessonType>,
): EditorStateType => {
  const id = state.focusedLesson;

  if (!id || !Object.keys(state.lessons).includes(id)) return state;

  const newState = { ...state };
  newState.lessons[id] = { ...state.lessons[id], ...lesson };
  // Update to let the state know things have changed
  newState.hasChanged = updateChangeStatus(state.hasChanged, id, "UPDATE");
  return newState;
};

const replaceLessonID = (
  state: EditorStateType,
  oldID: string,
  newID: string,
  moduleIndex: number,
): EditorStateType => {
  const newState = { ...state };

  // Remove old ID & add new one
  const rename = (oID: string, neID: string, { [oID]: old, ...rest }) => ({
    [neID]: old,
    ...rest,
  });
  newState.lessons = rename(oldID, newID, state.lessons);
  // Replace lesson ID in the course
  const oldIndex = newState.course.modules[moduleIndex].lessons.findIndex(
    (id) => id === oldID,
  );
  newState.course.modules[moduleIndex].lessons[oldIndex] = newID;
  // Replaced focused ID if needed
  if (state.focusedLesson === oldID) {
    newState.focusedLesson = newID;
  }
  return newState;
};

const deleteLesson = (
  state: EditorStateType,
  id: string,
  moduleIndex: number,
) => {
  if (!id || !Object.keys(state.lessons).includes(id)) return state;
  // TODO: This is dangerous, we should use immutable ways to edit this data
  const newState = JSON.parse(JSON.stringify(state));

  delete newState.lessons[id];

  const lessonIndex = state.course.modules[moduleIndex].lessons.findIndex(
    (l) => l === id,
  );

  newState.course.modules[moduleIndex].lessons.splice(lessonIndex, 1);

  // // If focused lesson is the lesson to delete, change focused lesson
  if (state.focusedLesson === id) {
    if (lessonIndex > 0) {
      // set to previous lesson
      newState.focusedLesson = newState.lessons[lessonIndex - 1];
    } else if (lessonIndex < newState.lessons.length - 1) {
      // set to next lesson
      newState.focusedLesson = newState.lessons[lessonIndex + 1];
    } else {
      // set to null
      newState.focusedLesson = null;
    }
  }
  // Update to let the state know things have changed
  newState.hasChanged = updateChangeStatus(state.hasChanged, id, "DELETE");
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

  let block: ContentBlockState | null;
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
    case ContentTypeEnum.VIDEO.id:
      block = {
        type: ContentTypeEnum.VIDEO,
        id: uuid(),
        content: {
          link: "",
        },
      };
      break;
    default:
      throw Error("Invalid block id");
  }
  // Create new lesson
  const newContent = [...state.lessons[id].content];
  newContent.splice(index, 0, block);
  const newLesson = { ...state.lessons[id], content: newContent };
  // Add new lesson to the state
  const newState = { ...state };
  newState.lessons = {
    ...state.lessons,
    [id]: newLesson,
  };
  // Update to let the state know things have changed
  newState.hasChanged = updateChangeStatus(state.hasChanged, id, "UPDATE");
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
  // Update to let the state know things have changed
  newState.hasChanged = updateChangeStatus(state.hasChanged, id, "UPDATE");
  return newState;
};

const updateLessonContentBlock = (
  state: EditorStateType,
  index: number,
  block: ContentBlockState,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || !Object.keys(state.lessons).includes(id)) return state;

  console.assert(index >= 0, "Content block index must be positive");
  console.assert(
    index < state.lessons[id].content.length,
    "Content block index exceeds content length",
  );
  const newState = { ...state };
  newState.lessons[id].content[index] = block;
  // Update to let the state know things have changed
  newState.hasChanged = updateChangeStatus(state.hasChanged, id, "UPDATE");
  return newState;
};

const deleteLessonContentBlock = (
  state: EditorStateType,
  index: number,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || !Object.keys(state.lessons).includes(id)) return state;
  console.assert(index >= 0, "Content block index must be positive");
  console.assert(
    index < state.lessons[id].content.length,
    "Content block index exceeds content length",
  );
  const newState = { ...state };
  newState.lessons[id].content.splice(index, 1);
  // Update to let the state know things have changed
  newState.hasChanged = updateChangeStatus(state.hasChanged, id, "UPDATE");
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

  switch (action.type) {
    case "set-focus":
      return {
        ...state,
        focusedLesson: action.value,
      };
    case "create-lesson":
      return createLesson(state, action.value.lesson, action.value.moduleIndex);
    case "update-lesson":
      return updateLesson(state, action.value);
    case "delete-lesson":
      return deleteLesson(
        state,
        action.value.lessonId,
        action.value.moduleIndex,
      );
    case "update-lesson-id":
      return replaceLessonID(
        state,
        action.value.oldID,
        action.value.newID,
        action.value.moduleIndex,
      );
    case "create-block":
      return createLessonContentBlock(
        state,
        action.value.blockID,
        action.value.index,
      );
    case "reorder-blocks":
      return reorderLessonContentBlocks(
        state,
        action.value.oldIndex,
        action.value.newIndex,
      );
    case "update-block":
      return updateLessonContentBlock(
        state,
        action.value.index,
        action.value.block,
      );
    case "delete-block":
      return deleteLessonContentBlock(state, action.value);
    default:
      return state;
  }
}
