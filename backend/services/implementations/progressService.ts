import MgCourse from "../../models/course.model";
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
    const functionCalledAt = now();
    try {
      await MgCourseProgress.findOneAndUpdate(
        { user: userId, course: courseId },
        { startedAt: functionCalledAt },
        {
          new: true,
          upsert: true,
        },
      );
      return functionCalledAt;
    } catch (error: unknown) {
      Logger.error(
        `Failed to start course. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async markModuleAsCompletedForUser(
    userId: string,
    courseId: string,
    moduleIndex: number,
  ): Promise<Date> {
    const functionCalledAt = now();
    try {
      const courseProgress =
        (await MgCourseProgress.findOne({ user: userId, course: courseId })) ||
        (await MgCourseProgress.create({
          user: userId,
          course: courseId,
          moduleProgress: [],
        }));

      // Add progress up until the current index.
      let { moduleProgress } = courseProgress;
      moduleProgress = [
        ...moduleProgress,
        ...Array(Math.max(moduleIndex + 1 - moduleProgress.length, 0)).fill(
          null,
        ),
      ];

      // Mark the specified module as completed.
      moduleProgress[moduleIndex] = {
        ...(moduleProgress[moduleIndex] || {}),
        completedAt: functionCalledAt,
      };
      const courseProgressUpdates: Partial<CourseProgress> = { moduleProgress };

      // Mark the course as completed if all modules are completed.
      if (moduleProgress.every((progress) => progress?.completedAt)) {
        // Need to make sure the user has created progress for all modules as well.
        const course = await MgCourse.findById(courseId);
        if (course == null) {
          throw new Error("Course ID not found");
        }

        if (course.modules.length === moduleProgress.length) {
          courseProgressUpdates.completedAt = functionCalledAt;
        }
      }

      await MgCourseProgress.update(
        { user: userId, course: courseId },
        courseProgressUpdates,
      );

      return functionCalledAt;
    } catch (error: unknown) {
      Logger.error(
        `Failed to complete module. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async markLessonAsCompletedForUser(
    userId: string,
    lessonId: string,
  ): Promise<Date> {
    const functionCalledAt = now();
    try {
      await MgLessonProgress.findOneAndUpdate(
        { user: userId, lesson: lessonId },
        { completedAt: functionCalledAt },
        {
          new: true,
          upsert: true,
        },
      );
      return functionCalledAt;
    } catch (error: unknown) {
      Logger.error(
        `Failed to complete lesson. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ProgressService;
