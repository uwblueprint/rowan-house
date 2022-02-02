export interface LessonRequestDTO {
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
   * create an Lesson with the fields given in the DTO, return created Lesson
   * @param lesson to be created
   * @returns the created Lesson
   * @throws Error if creation fails
   */
  createLesson(lesson: LessonRequestDTO): Promise<LessonResponseDTO>;
}
