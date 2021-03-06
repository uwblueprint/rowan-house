import { ContentBlockState } from "./ContentBlockTypes";

export interface LessonType {
  course: string;
  module: string;
  title: string;
  id?: string;
  description?: string;
  image?: string;
  content: ContentBlockState[];
}

export type LessonsType = Record<string, LessonType>;

export interface ModuleType {
  id: string;
  title: string;
  description?: string;
  image: string;
  previewImage: string;
  published: boolean;
  lessons: string[];
}

export interface CourseType {
  id: string;
  title: string;
  description?: string;
  image: string | null;
  previewImage: string | null;
  private: boolean;
  modules: ModuleType[];
}

export interface ModuleEditorParams {
  courseID: string;
  moduleIndex: string;
}

export type EditorChangeStatus = "CREATE" | "UPDATE" | "DELETE";

export interface EditorChangeStatuses {
  [doc_id: string]: EditorChangeStatus;
}

// Context types
export interface EditorStateType {
  course: CourseType;
  lessons: LessonsType;
  focusedLesson: string | null;
  hasChanged: EditorChangeStatuses;
}

export type EditorContextType = {
  state: EditorStateType;
  dispatch: (value: EditorContextAction) => void;
} | null;

export type EditorContextAction =
  | {
      type: "init";
      value: EditorStateType;
    }
  | {
      type: "set-focus";
      value: string | null;
    }
  | {
      type: "create-lesson";
      value: LessonType;
    }
  | {
      type: "update-lesson";
      value: LessonType;
    }
  | {
      type: "delete-lesson";
      value: string;
    }
  | {
      type: "update-lesson-id";
      value: { oldID: string; newID: string };
    }
  | {
      type: "create-block";
      value: { index: number; blockID: string };
    }
  | {
      type: "reorder-blocks";
      value: { oldIndex: number; newIndex: number };
    }
  | {
      type: "update-block";
      value: { index: number; block: ContentBlockState };
    }
  | {
      type: "delete-block";
      value: number;
    };

export interface EditContentOptionsMenuProps {
  isVisible: boolean;
  onEditClick: () => void;
  onCopyClick: () => void;
  onDeleteClick: () => void;
}

export interface EditContentModalProps<BlockType extends ContentBlockState> {
  onClose: () => void;
  isOpen: boolean;
  block: BlockType;
  index: number;
}
