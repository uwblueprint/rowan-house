import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import {
  CreateCourseRequestDTO,
  UpdateCourseRequestDTO,
  CourseResponseDTO,
  ICourseService,
} from "../interfaces/ICourseService";
import MgCourse, {
  Course,
  CourseVisibilityAttributes,
} from "../../models/course.model";

const Logger = logger(__filename);

class CourseService implements ICourseService {
  /* eslint-disable class-methods-use-this */
  async getCourse(id: string): Promise<CourseResponseDTO> {
    let course: Course | null;
    try {
      course = await MgCourse.findById(id);
      if (!course) {
        throw new Error(`Course id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get course. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
      previewImage: course.previewImage,
      lessons: course.lessons,
      private: course.private,
      published: course.published,
    };
  }

  async getCourses(
    queryConditions: CourseVisibilityAttributes,
  ): Promise<CourseResponseDTO[]> {
    try {
      const courses: Array<Course> = await MgCourse.find(queryConditions);
      return courses.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        image: course.image,
        previewImage: course.previewImage,
        lessons: course.lessons,
        private: course.private,
        published: course.published,
      }));
    } catch (error: unknown) {
      Logger.error(`Failed to get courses. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async createCourse(
    course: CreateCourseRequestDTO,
  ): Promise<CourseResponseDTO> {
    let newCourse: Course | null;
    try {
      newCourse = await MgCourse.create(course);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create course. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: newCourse.id,
      title: newCourse.title,
      description: newCourse.description,
      image: newCourse.image,
      previewImage: newCourse.previewImage,
      lessons: newCourse.lessons,
      private: newCourse.private,
      published: newCourse.published,
    };
  }

  async updateCourse(
    id: string,
    course: UpdateCourseRequestDTO,
  ): Promise<CourseResponseDTO | null> {
    let updatedCourse: Course | null;
    try {
      updatedCourse = await MgCourse.findByIdAndUpdate(id, course, {
        new: true,
        runValidators: true,
      });
      if (!updatedCourse) {
        throw new Error(`Course id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update course. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return {
      id: updatedCourse.id,
      title: updatedCourse.title,
      description: updatedCourse.description,
      image: updatedCourse.image,
      previewImage: updatedCourse.previewImage,
      lessons: updatedCourse.lessons,
      private: updatedCourse.private,
      published: updatedCourse.published,
    };
  }

  async deleteCourse(id: string): Promise<string> {
    try {
      const deletedCourse: Course | null = await MgCourse.findByIdAndDelete(id);
      if (!deletedCourse) {
        throw new Error(`Course id ${id} not found`);
      }
      return id;
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete course. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default CourseService;
