export interface CourseProgressResponseDTO {
  startedAt?: Date;
  completedAt?: Date;
}

export interface ModuleProgressResponseDTO {
  startedAt?: Date;
  completedAt?: Date;
}

export interface LessonProgressResponseDTO {
  completedAt?: Date;
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
   * retrieve the ModuleProgresses corresponding to the provided user and course
   * @param userId the user's ID
   * @param courseId the course's ID
   * @returns requested ModuleProgresses
   * @throws Error if retrieval fails
   */
  getModuleProgressByIds(
    userId: string,
    courseId: string,
  ): Promise<Array<ModuleProgressResponseDTO>>;

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
   * mark a Module as started for the provided user, returning the timestamp
   * at which they started it. Will also mark the corresponding course as
   * started if it has not yet been started.
   * @param userId the user's ID
   * @param courseId the module's course's ID
   * @param moduleIndex the module's index within the course
   * @returns the timestamp the course was started at
   * @throws Error if creation fails
   */
  markModuleAsStartedForUser(
    userId: string,
    courseId: string,
    moduleIndex: number,
  ): Promise<Date>;

  /**
   * mark a Module as completed for the provided user, returning the timestamp
   * at which they completed it. Will also mark the corresponding course as
   * completed if all modules are completed.
   * @param userId the user's ID
   * @param courseId the module's course's ID
   * @param moduleIndex the module's index within the course
   * @returns the timestamp the course was completed at
   * @throws Error if creation fails
   */
  markModuleAsCompletedForUser(
    userId: string,
    courseId: string,
    moduleIndex: number,
  ): Promise<Date>;

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
