import { CourseVisibilityAttributes } from "../../models/course.model";

interface Module {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  published: boolean;
  lessons: string[];
}

export interface ModuleDTO extends Module {
  id: string;
}

export interface CreateCourseRequestDTO {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: Module[];
  private: boolean;
  published: boolean;
}

export interface UpdateCourseRequestDTO {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  private: boolean;
  published: boolean;
  modules: Module[];
}

export interface CourseResponseDTO {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  private: boolean;
  published: boolean;
  modules: Module[];
}

export interface SerializedCreateCourseRequestDTO
  extends Omit<CreateCourseRequestDTO, "modules"> {
  modules: ModuleDTO[];
}

export interface SerializedUpdateCourseRequestDTO
  extends Omit<UpdateCourseRequestDTO, "modules"> {
  modules: ModuleDTO[];
}

export interface SerializedCourseResponseDTO
  extends Omit<CourseResponseDTO, "modules"> {
  modules: ModuleDTO[];
}

export interface ICourseService {
  /**
   * retrieve the Course with the given id
   * @param id course id
   * @param queryConditions CourseVisibilityAttributes object to filter courses
   * @returns requested Course
   * @throws Error if retrieval fails
   */
  getCourse(
    id: string,
    queryConditions: CourseVisibilityAttributes,
  ): Promise<CourseResponseDTO>;

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
