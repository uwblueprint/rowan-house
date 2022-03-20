import MgLesson, { Lesson } from "../../models/lesson.model";
import {
  ILessonService,
  LessonResponseDTO,
  CreateLessonRequestDTO,
  UpdateLessonRequestDTO,
} from "../interfaces/ILessonService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class LessonService implements ILessonService {
  /* eslint-disable class-methods-use-this */
  async getLessonById(id: string): Promise<LessonResponseDTO> {
    let lesson: Lesson | null;
    try {
      lesson = await MgLesson.findById(id);
      if (!lesson) {
        throw new Error(`Lesson id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get lesson. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: lesson.id,
      course: lesson.course,
      module: lesson.module,
      title: lesson.title,
      description: lesson.description,
      image: lesson.image,
      content: lesson.content,
    };
  }

  async createLesson(
    lesson: CreateLessonRequestDTO,
  ): Promise<LessonResponseDTO> {
    let newLesson: Lesson;
    try {
      newLesson = await MgLesson.create(lesson);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create lesson. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: newLesson.id,
      course: newLesson.course,
      module: newLesson.module,
      title: newLesson.title,
      description: newLesson.description,
      image: newLesson.image,
      content: newLesson.content,
    };
  }

  async updateLesson(
    id: string,
    lesson: UpdateLessonRequestDTO,
  ): Promise<LessonResponseDTO> {
    let updatedLesson: Lesson | null;
    try {
      updatedLesson = await MgLesson.findByIdAndUpdate(id, lesson, {
        new: true,
        runValidators: true,
      });
      if (!updatedLesson) {
        throw new Error(`Lesson id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update lesson. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return {
      id: updatedLesson.id,
      course: updatedLesson.course,
      module: updatedLesson.module,
      title: updatedLesson.title,
      description: updatedLesson.description,
      image: updatedLesson.image,
      content: updatedLesson.content,
    };
  }

  async deleteLesson(id: string): Promise<string> {
    try {
      const deletedLesson: Lesson | null = await MgLesson.findByIdAndDelete(id);
      if (!deletedLesson) {
        throw new Error(`Lesson id ${id} not found`);
      }
      return id;
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete lesson. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default LessonService;
