import { v4 as uuid } from "uuid";
import { ContentType } from "../APIClients/types/LessonClientTypes";

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

export const ContentTypeCategories = ["Layout", "Basic", "Media"];

export class ContentTypeEnum {
  static new = <ClientType>(
    title: string,
    preview: string,
    clientType: ContentType,
  ): ContentTypeEnum & { clientType: ClientType } =>
    new ContentTypeEnum(title, preview, clientType) as ContentTypeEnum & {
      clientType: ClientType;
    };

  static COLUMN = ContentTypeEnum.new<"column">(
    "Column",
    "column.svg",
    "column",
  );

  static HEADING = ContentTypeEnum.new<"heading">(
    "Heading",
    "heading.svg",
    "heading",
  );

  static TEXT = ContentTypeEnum.new<"text">("Text", "text.svg", "text");

  static LINK = ContentTypeEnum.new<"link">("Link", "link.svg", "link");

  static BUTTON = ContentTypeEnum.new<"button">(
    "Button",
    "button.svg",
    "button",
  );

  static IMAGE = ContentTypeEnum.new<"image">("Image", "image.svg", "image");

  static VIDEO = ContentTypeEnum.new<"video">("Video", "video.svg", "video");

  static AUDIO = ContentTypeEnum.new<"audio">("Audio", "audio.svg", "audio");

  public readonly id: string;

  constructor(
    public readonly title: string,
    public readonly preview: string,
    public readonly clientType: ContentType,
  ) {
    this.id = uuid();
  }
}

export interface ContentBlockStateType<
  ClientType extends ContentType,
  BlockStateType
> {
  type: ContentTypeEnum & { clientType: ClientType };
  content: BlockStateType;
  id: string;
}

export type TextBlockState = ContentBlockStateType<
  "text",
  {
    text: string;
  }
>;

export type ImageBlockState = ContentBlockStateType<
  "image",
  {
    link: string;
  }
>;

export type ContentBlockState = TextBlockState | ImageBlockState;

export interface EditModalProps<BlockType extends ContentBlockState> {
  onClose: () => void;
  isOpen: boolean;
  block: BlockType;
  index: number;
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
