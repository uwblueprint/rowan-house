import ProgressService from "../../services/implementations/progressService";
import {
  CourseProgressResponseDTO,
  LessonProgressResponseDTO,
  IProgressService,
} from "../../services/interfaces/IProgressService";

const progressService: IProgressService = new ProgressService();

const progressResolvers = {
  Query: {
    courseProgress: async (
      _parent: undefined,
      { userId, courseIds }: { userId: string; courseIds: Array<string> },
    ): Promise<Array<CourseProgressResponseDTO>> => {
      return progressService.getCourseProgressByIds(userId, courseIds);
    },
    lessonProgress: async (
      _parent: undefined,
      { userId, lessonIds }: { userId: string; lessonIds: Array<string> },
    ): Promise<Array<LessonProgressResponseDTO>> => {
      return progressService.getLessonProgressByIds(userId, lessonIds);
    },
  },
  Mutation: {
    markCourseAsStartedForUser: async (
      _parent: undefined,
      { userId, courseId }: { userId: string; courseId: string },
    ): Promise<Date> => {
      return progressService.markCourseAsStartedForUser(userId, courseId);
    },
    markModuleAsCompletedForUser: async (
      _parent: undefined,
      {
        userId,
        courseId,
        moduleIndex,
      }: { userId: string; courseId: string; moduleIndex: number },
    ): Promise<Date> => {
      return progressService.markModuleAsCompletedForUser(
        userId,
        courseId,
        moduleIndex,
      );
    },
    markLessonAsCompletedForUser: async (
      _parent: undefined,
      { userId, lessonId }: { userId: string; lessonId: string },
    ): Promise<Date> => {
      return progressService.markLessonAsCompletedForUser(userId, lessonId);
    },
  },
};

export default progressResolvers;
