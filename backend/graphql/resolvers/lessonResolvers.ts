import LessonService from "../../services/implementations/lessonService";
import {
  ILessonService,
  LessonResponseDTO,
  LessonCreateRequestDTO,
  LessonUpdateRequestDTO,
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
      { lesson }: { lesson: LessonCreateRequestDTO },
    ): Promise<LessonResponseDTO> => {
      const newLesson = await lessonService.createLesson(lesson);
      return newLesson;
    },
    updateLesson: async (
      _parent: undefined,
      { id, lesson }: { id: string; lesson: LessonUpdateRequestDTO },
    ): Promise<LessonResponseDTO | null> => {
      return lessonService.updateLesson(id, lesson);
    },
    deleteLesson: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<string> => {
      return lessonService.deleteLesson(id);
    },
  },
};
export default lessonResolvers;
