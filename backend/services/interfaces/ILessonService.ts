export interface LessonCreateRequestDTO {
  course: string;
  title: string;
  description: string;
  image: string;
  content: [Record<string, unknown>];
}

export interface LessonUpdateRequestDTO {
  course: string;
  title: string;
  description: string;
  image: string;
  content: [Record<string, unknown>];
}

export interface LessonResponseDTO {
  id: string;
  course: string;
  title: string;
  description: string;
  image: string;
  content: [Record<string, unknown>];
}

export interface ILessonService {
  /**
   * retrieve the Lesson with the given id
   * @param id lesson id
   * @returns requested Lesson
   * @throws Error if retrieval fails
   */
  getLessonById(id: string): Promise<LessonResponseDTO>;

  /**
   * create a Lesson with the fields given in the DTO, return created Lesson
   * @param lesson to be created
   * @returns the created Lesson
   * @throws Error if creation fails
   */
  createLesson(lesson: LessonCreateRequestDTO): Promise<LessonResponseDTO>;

  /**
   * create a Lesson with the fields given in the DTO, return created Lesson
   * @param id lesson id
   * @param lesson to be updated
   * @returns the updated Lesson
   * @throws Error if update fails
   */
  updateLesson(
    id: string,
    lesson: LessonUpdateRequestDTO,
  ): Promise<LessonResponseDTO | null>;

  /**
   * create a Lesson with the fields given in the DTO, return created Lesson
   * @param id of lesson to be deleted
   * @returns id of lesson deleted
   * @throws Error if deletion fails
   */
  deleteLesson(id: string): Promise<string>;
}
