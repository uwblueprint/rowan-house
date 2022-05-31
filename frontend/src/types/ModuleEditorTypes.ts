import { v4 as uuid } from "uuid";

export interface LessonType {
  course: string;
  module: string;
  title: string;
  description?: string;
  image?: string;
  content: ContentBlock[];
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
  title: string;
  description?: string;
  private: boolean;
  modules: ModuleType[];
}

export const ContentTypeCategories = ["Layout", "Basic", "Media"];
export class ContentTypeEnum {
  static COLUMN = new ContentTypeEnum("Column", "column.svg", uuid());

  static HEADING = new ContentTypeEnum("Heading", "heading.svg", uuid());

  static TEXT = new ContentTypeEnum("Text", "text.svg", uuid());

  static LINK = new ContentTypeEnum("Link", "link.svg", uuid());

  static BUTTON = new ContentTypeEnum("Button", "button.svg", uuid());

  static IMAGE = new ContentTypeEnum("Image", "image.svg", uuid());

  static VIDEO = new ContentTypeEnum("Video", "video.svg", uuid());

  static AUDIO = new ContentTypeEnum("Audio", "audio.svg", uuid());

  constructor(
    public readonly title: string,
    public readonly preview: string,
    public readonly id: string,
  ) {}
}

export type ContentProps = {
  text?: string;
  link?: string;
};

export interface ContentBlock {
  type: ContentTypeEnum;
  content: ContentProps;
  id: string;
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
      value: string;
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
      value: { index: number; block: ContentBlock };
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
