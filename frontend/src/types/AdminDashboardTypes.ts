export interface ModulePreviewProps {
  title: string;
  description?: string;
  published: boolean;
}

export interface CoursePreviewProps {
  title: string;
  description?: string;
  isPrivate: boolean;
  modules: Array<ModulePreviewProps>;
}
