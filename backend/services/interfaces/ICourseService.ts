export interface CourseRequestDTO {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  lessons: [string];
}

export interface CourseResponseDTO {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  lessons: [string];
}

export interface ICourseService {
  /**
   * retrieve the Course with the given id
   * @param id course id
   * @returns requested Course
   * @throws Error if retrieval fails
   */
  getCourse(id: string): Promise<CourseResponseDTO>;

  /**
   * retrieve all Courses
   * @param
   * @returns returns array of Courses
   * @throws Error if retrieval fails
   */
  getCourses(): Promise<CourseResponseDTO[]>;

  /**
   * create an Course with the fields given in the DTO, return created Course
   * @param course user's email
   * @returns the created Course
   * @throws Error if creation fails
   */
  createCourse(course: CourseRequestDTO): Promise<CourseResponseDTO>;

  /**
   * update the Course with the given id with fields in the DTO, return updated Course
   * @param id course id
   * @param course Updated Course
   * @returns the updated Course
   * @throws Error if update fails
   */
  updateCourse(
    id: string,
    course: CourseRequestDTO,
  ): Promise<CourseResponseDTO | null>;

  /**
   * delete the course with the given id
   * @param id course id
   * @returns id of the course deleted
   * @throws Error if deletion fails
   */
  deleteCourse(id: string): Promise<string>;
}
