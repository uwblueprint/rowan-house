export interface Module {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  previewImage: string | null;
  published: boolean;
  lessons: string[] | null;
}

export interface CourseRequest {
  title: string;
  description?: string;
  image?: string;
  previewImage?: string;
  modules?: Module[];
  private?: boolean;
}

export interface CourseResponse {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  previewImage: string | null;
  modules: Module[] | null;
  private: boolean;
}
