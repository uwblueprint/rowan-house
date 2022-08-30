import MgCourse from "../../models/course.model";
import MgCourseProgress, {
  CourseProgress,
  ModuleProgress,
} from "../../models/courseProgress.model";
import MgLessonProgress, {
  LessonProgress,
} from "../../models/lessonProgress.model";
import {
  IProgressService,
  CourseProgressResponseDTO,
  ModuleProgressResponseDTO,
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

  async getModuleProgressByIds(
    userId: string,
    courseId: string,
  ): Promise<Array<ModuleProgressResponseDTO>> {
    try {
      const courseProgress = await MgCourseProgress.findOne({
        user: userId,
        course: courseId,
      });
      if (!courseProgress) {
        return [];
      }

      const { moduleProgress } = courseProgress;
      return moduleProgress
        .map((progress) => progress || {})
        .map(({ startedAt, completedAt }) => ({ startedAt, completedAt }));
    } catch (error: unknown) {
      Logger.error(
        `Failed to get course progress. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getLessonProgressByIds(
    userId: string,
    lessonIds: Array<string>,
  ): Promise<Array<LessonProgressResponseDTO>> {
    let lessonProgress: Array<LessonProgress>;
    try {
      lessonProgress = await MgLessonProgress.find({
        user: userId,
        lesson: { $in: lessonIds },
      });
      console.log(lessonProgress);
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

  private async getOrCreateModuleProgress(
    userId: string,
    courseId: string,
    moduleIndex: number,
    serviceInvokedAt: Date,
  ): Promise<CourseProgress> {
    const courseProgress = await MgCourseProgress.findOneAndUpdate(
      { user: userId, course: courseId },
      {
        $setOnInsert: {
          user: userId,
          course: courseId,
          startedAt: serviceInvokedAt,
          moduleProgress: [],
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    // Add progress up until the current index.
    courseProgress.moduleProgress = [
      ...courseProgress.moduleProgress,
      ...Array(
        Math.max(moduleIndex + 1 - courseProgress.moduleProgress.length, 0),
      ).fill(null),
    ];
    return courseProgress;
  }

  async markModuleAsStartedForUser(
    userId: string,
    courseId: string,
    moduleIndex: number,
  ): Promise<Date> {
    const functionCalledAt = now();
    try {
      const courseProgress = await this.getOrCreateModuleProgress(
        userId,
        courseId,
        moduleIndex,
        functionCalledAt,
      );

      // Mark the specified module as started.
      const { moduleProgress } = courseProgress;
      const module = moduleProgress[moduleIndex];
      if (!module?.startedAt) {
        if (module == null) {
          moduleProgress[moduleIndex] = {
            startedAt: functionCalledAt,
          };
        } else {
          module.startedAt = functionCalledAt;
        }
      }

      await courseProgress.save();
      return module?.startedAt || functionCalledAt;
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
      const courseProgress = await this.getOrCreateModuleProgress(
        userId,
        courseId,
        moduleIndex,
        functionCalledAt,
      );

      // Mark the specified module as completed.
      const { moduleProgress } = courseProgress;
      const module = moduleProgress[moduleIndex];
      if (!module?.completedAt) {
        if (module == null) {
          moduleProgress[moduleIndex] = {
            completedAt: functionCalledAt,
          };
        } else {
          module.completedAt = functionCalledAt;
        }
      }

      // Mark the course as completed if all modules are completed.
      if (
        courseProgress.completedAt == null &&
        courseProgress.moduleProgress.every(
          (progress: ModuleProgress | null) => progress?.completedAt,
        )
      ) {
        // Need to make sure the user has created progress for all modules as well.
        const course = await MgCourse.findById(courseId);
        if (course == null) {
          throw new Error("Course ID not found");
        }

        if (course.modules.length <= courseProgress.moduleProgress.length) {
          courseProgress.completedAt = functionCalledAt;
        }
      }

      await courseProgress.save();

      return module?.completedAt || functionCalledAt;
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
      const lessonProgress = await MgLessonProgress.findOneAndUpdate(
        { user: userId, lesson: lessonId },
        { $setOnInsert: { completedAt: functionCalledAt } },
        {
          new: true,
          upsert: true,
        },
      );
      return lessonProgress.completedAt || functionCalledAt;
    } catch (error: unknown) {
      Logger.error(
        `Failed to complete lesson. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ProgressService;
