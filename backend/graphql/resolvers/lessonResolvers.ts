import LessonService from "../../services/implementations/lessonService";
import {
  ILessonService,
  LessonResponseDTO,
  LessonRequestDTO,
} from "../../services/interfaces/ILessonService";

const lessonService: ILessonService = new LessonService();

const lessonResolvers = {
  Query: {
    lessonById: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<LessonResponseDTO> => {
      return lessonService.getLessonById(id);
    },
  },
  Mutation: {
    createLesson: async (
      _parent: undefined,
      { lesson }: { lesson: LessonRequestDTO },
    ): Promise<LessonResponseDTO> => {
      const newLesson = await lessonService.createLesson(lesson);
      return newLesson;
    },
  },
};
export default lessonResolvers;
