export type Module = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  previewImage: string | null;
  published: boolean;
  lessons: string[] | null;
};

export type CourseRequest = {
  title: string;
  description?: string;
  image?: string;
  previewImage?: string;
  modules?: Module[];
  private?: boolean;
  published?: boolean;
};

export type CourseResponse = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  previewImage: string | null;
  modules: Module[] | null;
  private: boolean;
  published: boolean;
};
