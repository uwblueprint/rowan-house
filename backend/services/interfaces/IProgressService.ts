export interface CourseProgressResponseDTO {
  startedAt: Date;
  completedAt: Date;
}

export interface LessonProgressResponseDTO {
  completedAt: Date;
}

export interface IProgressService {
  /**
   * retrieve the CourseProgresses corresponding to the provided user and courses
   * @param userId the user's ID
   * @param courseIds the courses' IDs
   * @returns requested CourseProgresses
   * @throws Error if retrieval fails
   */
  getCourseProgressByIds(
    userId: string,
    courseIds: Array<string>,
  ): Promise<Array<CourseProgressResponseDTO>>;

  /**
   * retrieve the CourseProgresses corresponding to the provided user and courses
   * @param userId the user's ID
   * @param courseIds the courses' IDs
   * @returns requested CourseProgresses
   * @throws Error if retrieval fails
   */
  getLessonProgressByIds(
    userId: string,
    courseIds: Array<string>,
  ): Promise<Array<LessonProgressResponseDTO>>;

  /**
   * mark a Course as started for the provided user, returning the timestamp at
   * which they started it
   * @param userId the user's ID
   * @param courseId the course's ID
   * @returns the timestamp the course was started at
   * @throws Error if creation fails
   */
  markCourseAsStartedForUser(userId: string, courseId: string): Promise<Date>;

  /**
   * mark a Course as completed for the provided user, returning the timestamp
   * at which they completed it
   * @param userId the user's ID
   * @param courseId the course's ID
   * @returns the timestamp the course was completed at
   * @throws Error if creation fails
   */
  markCourseAsCompletedForUser(userId: string, courseId: string): Promise<Date>;

  /**
   * mark a Lesson as completed for the provided user, returning the timestamp
   * at which they completed it
   * @param userId the user's ID
   * @param lessonId the lesson's ID
   * @returns the timestamp the lesson was completed at
   * @throws Error if creation fails
   */
  markLessonAsCompletedForUser(userId: string, lessonId: string): Promise<Date>;
}
