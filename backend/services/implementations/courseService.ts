import { Types } from "mongoose";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import {
  CreateCourseRequestDTO,
  UpdateCourseRequestDTO,
  CourseResponseDTO,
  ICourseService,
} from "../interfaces/ICourseService";
import IImageUploadService from "../interfaces/IImageUploadService";
import MgCourse, {
  Course,
  CourseVisibilityAttributes,
} from "../../models/course.model";

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
  imageService: IImageUploadService;

  constructor(imageService: IImageUploadService) {
    this.imageService = imageService;
  }

  /* eslint-disable class-methods-use-this */
  private async hydrateImages(
    course: CourseResponseDTO,
  ): Promise<CourseResponseDTO> {
    const coursePreviewImage = course.image
      ? await this.imageService.download(course.image)
      : course.previewImage;
    const newModules = await Promise.all(
      course.modules.map(async (module) => {
        const modulePreviewImage = module?.image
          ? await this.imageService.download(module.image)
          : module?.previewImage;
        return (
          module && {
            // eslint-disable-next-line no-underscore-dangle
            _id: module._id,
            // eslint-disable-next-line no-underscore-dangle
            id: module._id,
            title: module.title,
            description: module.description,
            image: module.image,
            previewImage: modulePreviewImage,
            published: module.published,
            lessons: module.lessons,
          }
        );
      }),
    );

    return {
      ...course,
      previewImage: coursePreviewImage,
      modules: newModules,
    };
  }

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

    return this.hydrateImages({
      // eslint-disable-next-line no-underscore-dangle
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      image: course.image,
      previewImage: course.previewImage,
      modules: course.modules,
      private: course.private,
    });
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

      return await Promise.all(
        courses.map((course) => {
          return this.hydrateImages({
            // eslint-disable-next-line no-underscore-dangle
            id: course._id.toString(),
            title: course.title,
            description: course.description,
            image: course.image,
            previewImage: course.previewImage,
            modules: course.modules,
            private: course.private,
          });
        }),
      );
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
    return this.hydrateImages({
      id: newCourse.id,
      title: newCourse.title,
      description: newCourse.description,
      image: newCourse.image,
      previewImage: newCourse.previewImage,
      modules: newCourse.modules,
      private: newCourse.private,
    });
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

    return this.hydrateImages({
      id: updatedCourse.id,
      title: updatedCourse.title,
      description: updatedCourse.description,
      image: updatedCourse.image,
      previewImage: updatedCourse.previewImage,
      modules: updatedCourse.modules,
      private: updatedCourse.private,
    });
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
