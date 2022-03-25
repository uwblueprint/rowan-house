export interface Module {
  moduleId: string;
  title: string;
  published: boolean;
  imageLink: string;
}

export interface ModulePreviewProps extends Module {
  courseId: string;
}

export interface CoursePreviewProps {
  courseId: string;
  title: string;
  description?: string;
  isPrivate: boolean;
  modules: Array<Module>;
}
