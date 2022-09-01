import { v4 as uuid } from "uuid";
import {
  EditorContextAction,
  EditorStateType,
  LessonType,
  EditorChangeStatus,
  EditorChangeStatuses,
  ValidHeadingSizes,
} from "../types/ModuleEditorTypes";
import {
  ColumnBlockParam,
  ContentBlockState,
  ContentStateOverride,
  ContentTypeEnum,
} from "../types/ContentBlockTypes";

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

export const createContent = (blockID: string): ContentBlockState => {
  switch (blockID) {
    case ContentTypeEnum.BUTTON.id:
      return {
        type: ContentTypeEnum.BUTTON,
        id: uuid(),
        content: {
          link: "https://rowanhouse.ca",
          text: "Click Here",
        },
      };
    case ContentTypeEnum.COLUMN.id:
      return {
        type: ContentTypeEnum.COLUMN,
        id: uuid(),
        content: {
          left: null,
          right: null,
        },
      };
    case ContentTypeEnum.TEXT.id:
      return {
        type: ContentTypeEnum.TEXT,
        id: uuid(),
        content: {
          text: "Hello!",
        },
      };
    case ContentTypeEnum.IMAGE.id:
      return {
        type: ContentTypeEnum.IMAGE,
        id: uuid(),
        content: {
          link:
            "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        },
      };
    case ContentTypeEnum.VIDEO.id:
      return {
        type: ContentTypeEnum.VIDEO,
        id: uuid(),
        content: {
          link: "",
        },
      };
    case ContentTypeEnum.HEADING.id:
      return {
        type: ContentTypeEnum.HEADING,
        id: uuid(),
        content: {
          text: "",
          size: ValidHeadingSizes.heading1,
        },
      };
    default:
      throw Error("Invalid block id");
  }
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
  const block = createContent(blockID);

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
  content: ContentStateOverride,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || !Object.keys(state.lessons).includes(id)) return state;

  console.assert(index >= 0, "Content block index must be positive");
  console.assert(
    index < state.lessons[id].content.length,
    "Content block index exceeds content length",
  );
  const newState = { ...state };
  // Retrieve the current block and replace its contents
  const block = newState.lessons[id].content[index];
  block.content = {
    ...block.content,
    ...content,
  };
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

const addContentBlockToColumn = (
  state: EditorStateType,
  blockID: string,
  columnID: string,
  columnSide: ColumnBlockParam,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || !Object.keys(state.lessons).includes(id)) return state;

  // Find column index by ID
  const columnIndex = state.lessons[id].content.findIndex(
    (block) => block.id === columnID,
  );
  // Add new block to the state
  const newState = { ...state };
  const columnBlock = newState.lessons[id].content[columnIndex];
  if (!("left" in columnBlock.content) || !("right" in columnBlock.content)) {
    throw Error(
      "Column ID matches component, but component is not of type 'column'",
    );
  }
  columnBlock.content[columnSide] = createContent(blockID);
  // Update to let the state know things have changed
  newState.hasChanged = updateChangeStatus(state.hasChanged, id, "UPDATE");
  return newState;
};

const moveContentBlockToColumn = (
  state: EditorStateType,
  index: number,
  columnID: string,
  columnSide: ColumnBlockParam,
): EditorStateType => {
  const id = state.focusedLesson;
  if (!id || !Object.keys(state.lessons).includes(id)) return state;

  // Find column index by ID
  const columnIndex = state.lessons[id].content.findIndex(
    (block) => block.id === columnID,
  );
  // Add new block to the state
  const newState = { ...state };
  const columnBlock = newState.lessons[id].content[columnIndex];
  if (!("left" in columnBlock.content) || !("right" in columnBlock.content)) {
    throw Error(
      "Column ID matches component, but component is not of type 'column'",
    );
  }
  // Parse block out of the lesson and add it to the column
  const [block] = newState.lessons[id].content.splice(index, 1);
  columnBlock.content[columnSide] = block;
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
    case "set-completed-lessons":
      return {
        ...state,
        completedLessons: action.value,
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
        action.value.content,
      );
    case "delete-block":
      return deleteLessonContentBlock(state, action.value);
    case "create-block-in-column":
      return addContentBlockToColumn(
        state,
        action.value.blockID,
        action.value.columnID,
        action.value.columnSide,
      );
    case "move-block-to-column":
      return moveContentBlockToColumn(
        state,
        action.value.index,
        action.value.columnID,
        action.value.columnSide,
      );
    default:
      return state;
  }
}
