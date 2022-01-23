import LessonService from "../../services/implementations/lessonService";
import { ILessonService } from "../../services/interfaces/lessonService";
import { LessonDTO, CreateLessonDTO } from "../../types";

const lessonService: ILessonService = new LessonService();

const lessonResolvers = {
    Query: {
        lessonById: async (
          _parent: undefined,
          { id }: { id: string },
        ): Promise<LessonDTO> => {
          return lessonService.getLessonById(id);
        },
      },
      Mutation: {
        createLesson: async (
          _parent: undefined,
          { lesson }: { lesson: CreateLessonDTO },
        ): Promise<LessonDTO> => {
          const newLesson = await lessonService.createLesson(lesson);
          return newLesson;
        },
      },
}
export default lessonResolvers;
