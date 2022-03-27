export interface LessonType {
  course: string;
  module: string;
  title: string;
  description?: string;
  image?: string;
  content: Array<ContentType>;
}

export type LessonsType = Record<string, LessonType>;

export interface ModuleType {
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
  modules: Record<string, ModuleType>;
}

// Content types
export interface ContentTextProps {
  text: string;
}

export interface ContentImageProps {
  link: string;
}

export class ContentTypeEnum {
  static readonly TEXT = new ContentTypeEnum("Text", "text.svg");

  static readonly IMAGE = new ContentTypeEnum("Image", "image.svg");

  // private to disallow creating other instances of this type
  private constructor(
    public readonly title: string,
    public readonly preview: string,
  ) {}
}

export interface ContentType {
  type: ContentTypeEnum;
  content: ContentTextProps | ContentImageProps;
}

export interface ModuleEditorParams {
  courseID: string;
  moduleID: string;
}

// Context types
export interface EditorStateType {
  course: CourseType;
  lessons: LessonsType;
  focusedLesson: string | null;
  hasChanged: boolean;
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
      type: "create-lesson-block";
      value: { index: number; block: ContentType };
    }
  | {
      type: "update-lesson-block";
      value: { index: number; block: ContentType };
    }
  | {
      type: "delete-lesson-block";
      value: number;
    };
