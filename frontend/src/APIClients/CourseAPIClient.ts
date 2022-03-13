import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

type Module = {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  published: boolean;
  lessons: string[];
}

type SerializedModule = Module & {id: string}

export type CourseRequest = {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: {[id: string]: Module}
  private: boolean;
  published: boolean;
};

export type CourseResponse = {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: {[id: string]: Module}
  private: boolean;
  published: boolean;
};

type SerializedCourseResponse = Omit<CourseResponse, "modules"> & {modules: SerializedModule[]}
type SerializedCreateCourseRequest = Omit<CourseRequest, "modules"> & {modules: SerializedModule[]}
type SerializedUpdateCourseRequest = Partial<SerializedCreateCourseRequest>

// TO DO: error handling

const serializeModules = (modules: {[id: string]: Module}): SerializedModule[] => {
  return Object.entries(modules).map(([module_id, module]) => ({id: module_id, ...module}))
}

const deserializeModules = (serModules: SerializedModule[]): {[id: string]: Module} => {
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
}

const serializeCreateCourseRequest = (courseRequest: CourseRequest): SerializedCreateCourseRequest => {
  return {
    ...courseRequest,
    modules: serializeModules(courseRequest.modules)
  };
}

const serializeUpdateCourseRequest = (courseRequest: Partial<CourseRequest>): SerializedUpdateCourseRequest => {
  return {
    modules: courseRequest.modules === undefined ? undefined : serializeModules(courseRequest.modules)
  }
}

const deserializeCourseResponse = (serCourseResponse : SerializedCourseResponse): CourseResponse => {
  return {
    ...serCourseResponse,
    modules: deserializeModules(serCourseResponse.modules)
  }
}

const getCourse = async (id: string): Promise<CourseResponse> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    const { data } = await baseAPIClient.get(`/course/${id}`, {
      headers: { Authorization: bearerToken },
    });
    return deserializeCourseResponse(data);
  } catch (error) {
    return error;
  }
};

const getAllCourses = async (): Promise<CourseResponse[]> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    const { data } = await baseAPIClient.get("/course", {
      headers: { Authorization: bearerToken },
    });
    return data.map(deserializeCourseResponse);
  } catch (error) {
    return error;
  }
};

const createCourse = async (course: CourseRequest): Promise<CourseResponse> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    const { data } = await baseAPIClient.post("/course", serializeCreateCourseRequest(course), {
      headers: { Authorization: bearerToken },
    });
    return deserializeCourseResponse(data);
  } catch (error) {
    return error;
  }
};

const updateCourse = async (
  id: string,
  course: Partial<CourseRequest>,
): Promise<CourseResponse> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    const { data } = await baseAPIClient.put(`/course/${id}`, serializeUpdateCourseRequest(course), {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const deleteCourse = async (id: string): Promise<string> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    const { data } = await baseAPIClient.delete(`/course/${id}`, {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export default {
  getCourse,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
