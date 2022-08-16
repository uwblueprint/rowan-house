import { v4 as uuid } from "uuid";
import { ContentType } from "../APIClients/types/LessonClientTypes";

export const ContentTypeCategories = ["Layout", "Basic", "Media"];

export type HeadingBlockState = ContentBlockStateType<
  "heading",
  {
    size: string;
    text: string;
  }
>;
export type TextBlockState = ContentBlockStateType<
  "text",
  {
    text: string;
  }
>;
export type LinkBlockState = ContentBlockStateType<"link">;
export type ButtonBlockState = ContentBlockStateType<
  "button",
  {
    link: string;
    text: string;
  }
>;
export type ImageBlockState = ContentBlockStateType<
  "image",
  {
    link: string;
  }
>;
export type VideoBlockState = ContentBlockStateType<
  "video",
  {
    link: string;
  }
>;
export type AudioBlockState = ContentBlockStateType<"audio">;

export type ColumnBlockState = ContentBlockStateType<
  "column",
  {
    left: null | ContentBlockState;
    right: null | ContentBlockState;
  }
>;
export type ColumnBlockParam = 'left' | 'right'; // TODO: Better method ?

export type ContentBlockState = RequireAllContentTypesArePresent<
  | HeadingBlockState
  | TextBlockState
  | LinkBlockState
  | ButtonBlockState
  | ImageBlockState
  | VideoBlockState
  | AudioBlockState
  | ColumnBlockState
>;

export class ContentTypeEnum {
  private static CLIENT_TYPES: { [t in ContentType]?: ContentTypeEnum } = {};

  private static new = <ClientType>(
    title: string,
    preview: string,
    clientType: ContentType,
  ): ContentTypeEnum & { clientType: ClientType } => {
    const contentTypeEnum = new ContentTypeEnum(
      title,
      preview,
      clientType,
    ) as ContentTypeEnum & {
      clientType: ClientType;
    };
    ContentTypeEnum.CLIENT_TYPES[clientType] = contentTypeEnum;
    return contentTypeEnum;
  };

  static from = (clientType: ContentType): ContentTypeEnum => {
    const contentTypeEnum = ContentTypeEnum.CLIENT_TYPES[clientType];
    if (contentTypeEnum == null) {
      throw new Error(`Invalid content block type "${clientType}"`);
    }
    return contentTypeEnum;
  };

  static readonly COLUMN = ContentTypeEnum.new<"column">(
    "Column",
    "column.svg",
    "column",
  );

  static readonly HEADING = ContentTypeEnum.new<"heading">(
    "Heading",
    "heading.svg",
    "heading",
  );

  static readonly TEXT = ContentTypeEnum.new<"text">(
    "Text",
    "text.svg",
    "text",
  );

  static readonly LINK = ContentTypeEnum.new<"link">(
    "Link",
    "link.svg",
    "link",
  );

  static readonly BUTTON = ContentTypeEnum.new<"button">(
    "Button",
    "button.svg",
    "button",
  );

  static readonly IMAGE = ContentTypeEnum.new<"image">(
    "Image",
    "image.svg",
    "image",
  );

  static readonly VIDEO = ContentTypeEnum.new<"video">(
    "Video",
    "video.svg",
    "video",
  );

  static readonly AUDIO = ContentTypeEnum.new<"audio">(
    "Audio",
    "audio.svg",
    "audio",
  );

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

export interface MappedProps<
  BlockType extends ContentBlockState = ContentBlockState
> {
  block: BlockType;
}

export interface ContentBlockProps<
  BlockType extends ContentBlockState = ContentBlockState
> extends MappedProps<BlockType> {
  index?: number;
  editable?: boolean;
}

// Custom logic to make sure there aren't duplicated types.
// This is to prevent typos in the implementation logic above.
type RequireAllContentTypesArePresent<
  V extends ContentBlockStateType<ContentType, Record<string, unknown>>
> = (<G>() => G extends V["type"]["clientType"] ? true : false) extends <
  G
>() => G extends ContentType ? true : false
  ? V
  : "missing content type from ContentBlockState";
