import { v4 as uuidv4 } from "uuid";

import MgLesson, { Lesson } from "../../models/lesson.model";
import { 
  ILessonService,
  LessonRequestDTO,
  LessonResponseDTO,
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
      title: lesson.title,
      description: lesson.description,
      image: lesson.image,
      content: lesson.content,
    };
  }

  async createLesson(lesson: LessonRequestDTO): Promise<LessonResponseDTO> {
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
      title: newLesson.title,
      description: newLesson.description,
      image: newLesson.image,
      content: newLesson.content,
    };
  }
}

export default LessonService;

