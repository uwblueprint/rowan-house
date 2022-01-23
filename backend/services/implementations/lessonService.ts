import { v4 as uuidv4 } from "uuid";

import MgLesson, { Lesson } from "../../models/lesson.model";
import { ILessonService } from "../interfaces/lessonService";
import {
  LessonDTO,
  CreateLessonDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class LessonService implements ILessonService {

  /* eslint-disable class-methods-use-this */
  async getLessonById(id: string): Promise<LessonDTO> {
    let lesson: Lesson | null;
    try {
      lesson = await MgLesson.findById(id);
      if (!lesson) {
        throw new Error(`Lesson id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get entity. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: lesson.id,
      course: lesson.course,
      title: lesson.title,
      description: lesson.description,
      image: lesson.image,
      content: lesson.content,
    };
  }

  async createLesson(lesson: CreateLessonDTO): Promise<LessonDTO> {
    let newLesson: Lesson;
    try {
      newLesson = await MgLesson.create({ ...lesson });
    } catch (error: unknown) {
      Logger.error(
        `Failed to create entity. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: newLesson.id,
      course: newLesson.course,
      title: newLesson.title,
      description: newLesson.description,
      image: newLesson.image,
      content: newLesson.content,
    };
  }
}

export default LessonService;

