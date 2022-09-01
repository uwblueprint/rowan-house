import {
  ColumnBlockParam,
  ContentBlockState,
  ContentStateOverride,
  MappedProps,
} from "./ContentBlockTypes";

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

export interface ModuleProgressType {
  startedAt: Date;
  completedAt: Date;
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
  completedLessons: Set<string>;
  hasChanged: EditorChangeStatuses;
}

export type EditorContextType = {
  state: EditorStateType | null;
  dispatch: (value: EditorContextAction) => void;
};

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
      value: { lesson: LessonType; moduleIndex: number };
    }
  | {
      type: "update-lesson";
      value: Partial<LessonType>;
    }
  | {
      type: "set-completed-lessons";
      value: Set<string>;
    }
  | {
      type: "delete-lesson";
      value: { lessonId: string; moduleIndex: number };
    }
  | {
      type: "update-lesson-id";
      value: { oldID: string; newID: string; moduleIndex: number };
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
      value: { index: number; content: ContentStateOverride };
    }
  | {
      type: "delete-block";
      value: number;
    }
  | {
      type: "create-block-in-column";
      value: {
        blockID: string;
        columnID: string;
        columnSide: ColumnBlockParam;
      };
    }
  | {
      type: "move-block-to-column";
      value: {
        index: number;
        columnID: string;
        columnSide: ColumnBlockParam;
      };
    };

export enum ValidHeadingSizes {
  heading1 = "48px",
  heading2 = "32px",
  heading3 = "24px",
  heading4 = "16px",
}

export interface EditContentOptionsMenuProps {
  isVisible: boolean;
  onEditClick?: () => void;
  onCopyClick?: () => void;
  onDeleteClick?: () => void;
}

export interface EditContentModalProps<
  BlockType extends ContentBlockState = ContentBlockState
> extends MappedProps<BlockType> {
  isOpen: boolean;
  onClose: () => void;
  onSave: <T extends BlockType>(newBlock: T["content"]) => void;
}
