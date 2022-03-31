import { Types } from "mongoose";
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

const getModuleQueryCondition = (filterForPublished: boolean) => {
  return filterForPublished
    ? [
        {
          $project: {
            title: true,
            description: true,
            image: true,
            previewImage: true,
            private: true,
            published: true,
            modules: {
              $filter: {
                input: "$modules",
                cond: { this: { $eq: ["published", true] } },
              },
            },
          },
        },
      ]
    : [];
};

class CourseService implements ICourseService {
  /* eslint-disable class-methods-use-this */
  async getCourse(
    id: string,
    queryConditions: CourseVisibilityAttributes,
  ): Promise<CourseResponseDTO> {
    let course: Course | null;
    const filterModulesByPermissions = getModuleQueryCondition(
      queryConditions.published ?? false,
    );

    try {
      const courseQueryResult: Array<Course> | null = await MgCourse.aggregate([
        { $match: { _id: Types.ObjectId(id), ...queryConditions } },
        ...filterModulesByPermissions,
      ]).exec();

      if (!courseQueryResult || courseQueryResult.length === 0) {
        throw new Error(`Course id ${id} not found`);
      }

      [course] = courseQueryResult;
    } catch (error: unknown) {
      Logger.error(`Failed to get course. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: course._id.toHexString(),
      title: course.title,
      description: course.description,
      image: course.image,
      previewImage: course.previewImage,
      modules: course.modules,
      private: course.private,
      published: course.published,
    };
  }

  async getCourses(
    queryConditions: CourseVisibilityAttributes,
  ): Promise<CourseResponseDTO[]> {
    const filterCoursesByPermissions = { $match: queryConditions };
    const filterModulesByPermissions = getModuleQueryCondition(
      queryConditions.published ?? false,
    );

    try {
      const courses: Array<Course> = await MgCourse.aggregate([
        filterCoursesByPermissions,
        ...filterModulesByPermissions,
      ]).exec();
      return courses.map((course) => {
        return {
          id: course._id.toHexString(),
          title: course.title,
          description: course.description,
          image: course.image,
          previewImage: course.previewImage,
          modules: course.modules,
          private: course.private,
          published: course.published,
        };
      });
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
      modules: newCourse.modules,
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
      modules: updatedCourse.modules,
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
