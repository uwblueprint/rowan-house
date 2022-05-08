import { v4 as uuid } from "uuid";

export interface LessonType {
  course: string;
  module: string;
  title: string;
  description?: string;
  image?: string;
  content: ContentType[];
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

// Content types
export class ContentTypeEnum {
  static TEXT = new ContentTypeEnum("Text", "text.svg", uuid());

  static IMAGE = new ContentTypeEnum("Image", "image.svg", uuid());

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

export interface ContentType {
  type: ContentTypeEnum;
  content: ContentProps;
  id: string;
}

export interface ModuleEditorParams {
  courseID: string;
  moduleIndex: string;
}

// Context types
export interface EditorStateType {
  course: CourseType;
  lessons: LessonsType;
  focusedLesson: string | null;
  hasChanged: {
    [lessonId: string]: "CREATE" | "UPDATE" | "DELETE";
  };
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
      type: "create-block";
      value: { index: number; blockID: string };
    }
  | {
      type: "reorder-blocks";
      value: { oldIndex: number; newIndex: number };
    }
  | {
      type: "update-block";
      value: { index: number; block: ContentType };
    }
  | {
      type: "delete-block";
      value: number;
    };
