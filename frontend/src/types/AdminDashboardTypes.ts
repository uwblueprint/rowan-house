export interface ModulePreviewProps {
  title: string;
  published: boolean;
  imageLink: string;
}

export interface CoursePreviewProps {
  title: string;
  description?: string;
  isPrivate: boolean;
  modules: Array<ModulePreviewProps>;
}
