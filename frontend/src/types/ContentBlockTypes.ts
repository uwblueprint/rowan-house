import { v4 as uuid } from "uuid";
import { ContentType } from "../APIClients/types/LessonClientTypes";

export const ContentTypeCategories = ["Layout", "Basic", "Media"];

export type ColumnBlockState = ContentBlockStateType<"column">;
export type HeadingBlockState = ContentBlockStateType<"heading">;
export type TextBlockState = ContentBlockStateType<
  "text",
  {
    text: string;
  }
>;
export type LinkBlockState = ContentBlockStateType<"link">;
export type ButtonBlockState = ContentBlockStateType<"button">;
export type ImageBlockState = ContentBlockStateType<
  "image",
  {
    link: string;
  }
>;
export type VideoBlockState = ContentBlockStateType<"video">;
export type AudioBlockState = ContentBlockStateType<"audio">;

export type ContentBlockState = RequireAllContentTypesArePresent<
  | ColumnBlockState
  | HeadingBlockState
  | TextBlockState
  | LinkBlockState
  | ButtonBlockState
  | ImageBlockState
  | VideoBlockState
  | AudioBlockState
>;

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
  BlockStateType = never
> {
  type: ContentTypeEnum & { clientType: ClientType };
  content: BlockStateType;
  id: string;
}

export type ContentBlockTypeToState<Type extends ContentType> = Extract<
  ContentBlockState,
  { ["type"]: { ["clientType"]: Type } }
>;

export interface ContentBlockProps<BlockType extends ContentBlockState> {
  block: BlockType;
}

// Custom logic to make sure there aren't duplicated types.
// This is to prevent typos in the implementation logic above.
type RequireAllContentTypesArePresent<
  V extends ContentBlockStateType<ContentType, any>
> = (<G>() => G extends V["type"]["clientType"] ? true : false) extends <
  G
>() => G extends ContentType ? true : false
  ? V
  : "missing content type from ContentBlockState";
