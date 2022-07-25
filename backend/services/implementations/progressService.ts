import MgCourseProgress, {
  CourseProgress,
} from "../../models/courseProgress.model";
import MgLessonProgress, {
  LessonProgress,
} from "../../models/lessonProgress.model";
import {
  IProgressService,
  CourseProgressResponseDTO,
  LessonProgressResponseDTO,
} from "../interfaces/IProgressService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

const now = () => new Date();

class ProgressService implements IProgressService {
  /* eslint-disable class-methods-use-this */
  async getCourseProgressByIds(
    userId: string,
    courseIds: Array<string>,
  ): Promise<Array<CourseProgressResponseDTO>> {
    let courseProgress: Array<CourseProgress>;
    try {
      courseProgress = await MgCourseProgress.find({
        user: userId,
        course: { $in: courseIds },
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to get course progress. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return courseProgress.map(({ course, startedAt, completedAt }) => ({
      courseId: course,
      startedAt,
      completedAt,
    }));
  }

  async getLessonProgressByIds(
    userId: string,
    lessonIds: Array<string>,
  ): Promise<Array<LessonProgressResponseDTO>> {
    let lessonProgress: Array<LessonProgress>;
    try {
      lessonProgress = await MgLessonProgress.find({
        user: userId,
        course: { $in: lessonIds },
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to get lesson progress. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return lessonProgress.map(({ lesson, completedAt }) => ({
      lessonId: lesson,
      completedAt,
    }));
  }

  async markCourseAsStartedForUser(
    userId: string,
    courseId: string,
  ): Promise<Date> {
    try {
      const { startedAt } = await MgCourseProgress.findOneAndUpdate(
        { user: userId, course: courseId },
        { startedAt: now() },
        {
          new: true,
          upsert: true,
        },
      );
      return startedAt;
    } catch (error: unknown) {
      Logger.error(
        `Failed to start course. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async markCourseAsCompletedForUser(
    userId: string,
    courseId: string,
  ): Promise<Date> {
    try {
      const { completedAt } = await MgCourseProgress.findOneAndUpdate(
        { user: userId, course: courseId },
        { completedAt: now() },
        {
          new: true,
          upsert: true,
        },
      );
      return completedAt;
    } catch (error: unknown) {
      Logger.error(
        `Failed to complete course. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async markLessonAsCompletedForUser(
    userId: string,
    lessonId: string,
  ): Promise<Date> {
    try {
      const { completedAt } = await MgLessonProgress.findOneAndUpdate(
        { user: userId, lesson: lessonId },
        { completedAt: now() },
        {
          new: true,
          upsert: true,
        },
      );
      return completedAt;
    } catch (error: unknown) {
      Logger.error(
        `Failed to complete lesson. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ProgressService;
