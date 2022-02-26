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

export enum ContentType {
  "text",
  "image",
}

export type Content = {
  type: ContentType;
  content: ContentTextProps | ContentImageProps;
};
