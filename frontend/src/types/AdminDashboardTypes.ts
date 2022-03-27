import { Module } from "../APIClients/types/CourseClientTypes";

export interface ModulePreviewProps {
  id: string;
  courseId: string;
  title: string;
  image: string | null;
  published: boolean;
}

export interface CoursePreviewProps {
  courseId: string;
  title: string;
  description: string | null;
  isPrivate: boolean;
  modules: Module[] | null;
}
