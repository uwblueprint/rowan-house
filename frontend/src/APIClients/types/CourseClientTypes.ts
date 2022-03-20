type Module = {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  published: boolean;
  lessons: string[];
};

type SerializedModule = Module & { id: string };

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

type SerializedCourseResponse = Omit<CourseResponse, "modules"> & {
  modules: SerializedModule[];
};
type SerializedCreateCourseRequest = Omit<CourseRequest, "modules"> & {
  modules: SerializedModule[];
};
type SerializedUpdateCourseRequest = Partial<SerializedCreateCourseRequest>;

// Helper functions
export const serializeModules = (modules: ModulesById): SerializedModule[] => {
  return Object.entries(modules).map(([module_id, module]) => ({
    id: module_id,
    ...module,
  }));
};

export const deserializeModules = (
  serModules: SerializedModule[],
): ModulesById => {
  const modules: { [id: string]: Module } = {} as { [id: string]: Module };

  serModules.forEach((module) => {
    const moduleObj = {
      title: module.title,
      description: module.description,
      image: module.image,
      previewImage: module.previewImage,
      published: module.published,
      lessons: module.lessons,
    };

    modules[module.id] = moduleObj;
  });

  return modules;
};

export const serializeCreateCourseRequest = (
  courseRequest: CourseRequest,
): SerializedCreateCourseRequest => {
  return {
    ...courseRequest,
    modules: serializeModules(courseRequest.modules),
  };
};

export const serializeUpdateCourseRequest = (
  courseRequest: Partial<CourseRequest>,
): SerializedUpdateCourseRequest => {
  return {
    modules:
      courseRequest.modules === undefined
        ? undefined
        : serializeModules(courseRequest.modules),
  };
};

export const deserializeCourseResponse = (
  serCourseResponse: SerializedCourseResponse,
): CourseResponse => {
  return {
    ...serCourseResponse,
    modules: deserializeModules(serCourseResponse.modules),
  };
};
