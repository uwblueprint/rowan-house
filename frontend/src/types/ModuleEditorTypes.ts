export interface LessonProps {
  course: string;
  module: string;
  title: string;
  description?: string;
  image: string;
  content: Array<Content>;
}

export interface ModuleProps {
  title: string;
  description?: string;
  image: string;
  previewImage: string;
  published: boolean;
  lessons: Array<string>;
}

export interface ContentTextProps {
  text: string;
}

export interface ContentImageProps {
  link: string;
}

export class ContentType {
  static readonly TEXT = new ContentType("Text", "text.svg");

  static readonly IMAGE = new ContentType("Image", "image.svg");

  // private to disallow creating other instances of this type
  private constructor(
    public readonly title: string,
    public readonly preview: string,
  ) {}
}

export type Content = {
  type: ContentType;
  content: ContentTextProps | ContentImageProps;
};
