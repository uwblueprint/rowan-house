import { v4 as uuid } from "uuid";
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
import IFileStorageService from "../interfaces/fileStorageService";

const Logger = logger(__filename);

const publishedModulesOnlyQuery = [
  {
    $project: {
      title: true,
      description: true,
      image: true,
      previewImage: true,
      private: true,
      modules: {
        $filter: {
          input: "$modules",
          as: "module",
          cond: { $eq: ["$$module.published", true] },
        },
      },
    },
  },
];

class CourseService implements ICourseService {
  storageService: IFileStorageService;
  constructor(storageService: IFileStorageService) {
    this.storageService = storageService;
  }
  /* eslint-disable class-methods-use-this */
  async getCourse(
    id: string,
    queryConditions: CourseVisibilityAttributes,
  ): Promise<CourseResponseDTO> {
    let course: Course | null;

    try {
      const queryAttributes = queryConditions.includePrivateCourses
        ? { _id: Types.ObjectId(id) }
        : { _id: Types.ObjectId(id), private: false };

      if (queryConditions.includeOnlyPublishedModules) {
        const courseQueryResult: Array<Course> | null = await MgCourse.aggregate(
          [{ $match: queryAttributes }, ...publishedModulesOnlyQuery],
        ).exec();

        course = courseQueryResult?.length
          ? MgCourse.hydrate(courseQueryResult[0])
          : null;
      } else {
        course = await MgCourse.findOne(queryAttributes);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get course. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    if (!course) throw new Error(`Could not find course with id ${id}`);

    return {
      // eslint-disable-next-line no-underscore-dangle
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      image: course.image,
      previewImage: course.previewImage,
      modules: course.modules,
      private: course.private,
      fileName: course.fileName,
    };
  }

  async getCourses(
    queryConditions: CourseVisibilityAttributes,
  ): Promise<CourseResponseDTO[]> {
    try {
      let courses: Array<Course> | null;

      if (queryConditions.includeOnlyPublishedModules) {
        const filterQueryObject = queryConditions.includePrivateCourses
          ? []
          : [{ $match: { private: false } }];

        courses = await MgCourse.aggregate([
          ...filterQueryObject,
          ...publishedModulesOnlyQuery,
        ]).exec();
        courses = courses?.map(MgCourse.hydrate.bind(MgCourse)) || null;
      } else {
        courses = await MgCourse.find(
          queryConditions.includePrivateCourses ? {} : { private: false },
        );
      }

      if (!courses) throw new Error("Courses query failed");

      return courses.map((course) => {
        return {
          // eslint-disable-next-line no-underscore-dangle
          id: course._id.toString(),
          title: course.title,
          description: course.description,
          image: course.image,
          previewImage: course.previewImage,
          modules: course.modules,
          private: course.private,
          fileName: course.fileName,
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
    const fileName = course.filePath ? uuid() : "";
    try {
      if (course.filePath) {
        await this.storageService.createFile(
          fileName,
          course.filePath,
          course.fileContentType,
        )
      }
      newCourse = await MgCourse.create({...course, fileName });
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
      fileName,
    };
  }

  async updateCourse(
    id: string,
    course: UpdateCourseRequestDTO,
  ): Promise<CourseResponseDTO | null> {
    let updatedCourse: Course | null;
    let fileName = "";
    try {
      const currentCourse = await MgCourse.findById(id);
      const currentFileName = currentCourse?.fileName;

      if (course.filePath) {
        fileName = currentFileName || uuid();
        if (currentFileName) {
          await this.storageService.updateFile(
            fileName,
            course.filePath,
            course.fileContentType,
          );
        } else {
          await this.storageService.createFile(
            fileName,
            course.filePath,
            course.fileContentType,
          )
        }
      } else if (currentFileName) {
        await this.storageService.deleteFile(currentFileName);
      }
      updatedCourse = await MgCourse.findByIdAndUpdate(id, {...course, fileName}, {
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
      fileName,
    };
  }

  async deleteCourse(id: string): Promise<string> {
    try {
      const deletedCourse: Course | null = await MgCourse.findByIdAndDelete(id);
      if (!deletedCourse) {
        throw new Error(`Course id ${id} not found`);
      }
      if(deletedCourse.fileName) {
        await this.storageService.deleteFile(deletedCourse.fileName);
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
