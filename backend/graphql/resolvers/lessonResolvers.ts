// import lesson service?
import { LessonDTO } from "../../types";

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
