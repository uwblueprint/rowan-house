export type ContentType = "text" | "image" | "video";
export interface ContentBlockDTO {
  type: ContentType;
  content: Record<string, unknown>;
}

export interface LessonRequest {
  course: string;
  module: string;
  title: string;
  description?: string | null;
  image?: string | null;
  content?: ContentBlockDTO[] | null;
}

export interface LessonResponse {
  id: string;
  course: string;
  module: string;
  title: string;
  description: string | null;
  image: string | null;
  content: ContentBlockDTO[] | null;
}