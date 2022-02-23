import baseAPIClient from "./BaseAPIClient";

export type LessonRequest = {
  course: string;
  title: string;
  description: string;
  image: string;
  content: [Record<string, unknown>];
};

export type LessonResponse = {
  id: string | number;
  course: string;
  title: string;
  description: string;
  image: string;
  content: [Record<string, unknown>];
};

// TO DO: error handling

const get = async (id: string): Promise<LessonResponse> => {
  try {
    const { data } = await baseAPIClient.get(`/lesson${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

const create = async (lesson: LessonRequest): Promise<LessonResponse> => {
  try {
    const { data } = await baseAPIClient.post("/lesson", lesson);
    return data;
  } catch (error) {
    return error;
  }
};

const update = async (
  id: string,
  lesson: LessonRequest,
): Promise<LessonResponse> => {
  try {
    const { data } = await baseAPIClient.put(`/lesson${id}`, lesson);
    return data;
  } catch (error) {
    return error;
  }
};

const deleteLesson = async (id: string): Promise<string> => {
  try {
    const { data } = await baseAPIClient.delete(`/lesson${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export default { get, create, update, deleteLesson };
