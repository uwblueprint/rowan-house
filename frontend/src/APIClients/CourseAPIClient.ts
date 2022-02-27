import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

export type CourseRequest = {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  lessons: [string];
  private: boolean;
  published: boolean;
};

export type CourseResponse = {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  lessons: [string];
  private: boolean;
  published: boolean;
};

// TO DO: error handling

const getCourse = async (id: string): Promise<CourseResponse> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    const { data } = await baseAPIClient.get(`/course/${id}`, {
      headers: { Authorization: bearerToken },
    });
    return data;
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
    return data;
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
    const { data } = await baseAPIClient.post("/course", course, {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const updateCourse = async (
  id: string,
  course: CourseRequest,
): Promise<CourseResponse> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    const { data } = await baseAPIClient.put(`/course/${id}`, course, {
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
