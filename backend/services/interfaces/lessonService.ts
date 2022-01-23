import {
  LessonDTO,
  CreateLessonDTO,
} from "../../types";
  
export interface ILessonService {
  /**
   * retrieve the Lesson with the given id
   * @param id lesson id
   * @returns requested Lesson
   * @throws Error if retrieval fails
   */
  getLessonById(id: string): Promise<LessonDTO>;

  /**
   * create an Lesson with the fields given in the DTO, return created Lesson
   * @param lesson to be created
   * @returns the created Lesson
   * @throws Error if creation fails
   */
  createLesson(lesson: CreateLessonDTO): Promise<LessonDTO>;
}
  