type Module = {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  published: boolean;
  lessons: string[];
};

type ModulesById = { [id: string]: Module };

export type CourseRequest = {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: ModulesById;
  private: boolean;
  published: boolean;
};

export type CourseResponse = {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: ModulesById;
  private: boolean;
  published: boolean;
};
