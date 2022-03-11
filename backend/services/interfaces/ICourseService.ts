<<<<<<< Updated upstream
import { CourseVisibilityAttributes } from "../../models/course.model";

export interface CreateCourseRequestDTO {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  lessons: [string];
  private: boolean;
  published: boolean;
}

export interface UpdateCourseRequestDTO {
=======
export interface ModuleDTO {
  id: string;
>>>>>>> Stashed changes
  title: string;
  description: string;
  image: string;
  preview_image: string;
  published: Boolean;
  lessons: string[];
}

interface Module {
  title: string;
  description: string;
  image: string;
  preview_image: string;
  published: Boolean;
  lessons: string[];
}

export interface SerializedCourseRequestDTO {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: ModuleDTO[];
}

export interface SerializedCourseResponseDTO {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: ModuleDTO[];
}

export interface CourseRequestDTO {
  title: string;
  description: string;
  image: string;
  previewImage: string;
<<<<<<< Updated upstream
  lessons: [string];
  private: boolean;
  published: boolean;
=======
  modules: {[id: string]: Module}
>>>>>>> Stashed changes
}

export interface CourseResponseDTO {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
<<<<<<< Updated upstream
  lessons: [string];
  private: boolean;
  published: boolean;
=======
  modules: {[id: string]: Module}
>>>>>>> Stashed changes
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
   * @param queryConditions CourseVisibilityAttributes object to filter courses
   * @returns returns array of Courses
   * @throws Error if retrieval fails
   */
  getCourses(
    queryConditions: CourseVisibilityAttributes,
  ): Promise<CourseResponseDTO[]>;

  /**
   * create an Course with the fields given in the DTO, return created Course
   * @param course user's email
   * @returns the created Course
   * @throws Error if creation fails
   */
  createCourse(course: CreateCourseRequestDTO): Promise<CourseResponseDTO>;

  /**
   * update the Course with the given id with fields in the DTO, return updated Course
   * @param id course id
   * @param course Updated Course
   * @returns the updated Course
   * @throws Error if update fails
   */
  updateCourse(
    id: string,
    course: UpdateCourseRequestDTO,
  ): Promise<CourseResponseDTO | null>;

  /**
   * delete the course with the given id
   * @param id course id
   * @returns id of the course deleted
   * @throws Error if deletion fails
   */
  deleteCourse(id: string): Promise<string>;
}
