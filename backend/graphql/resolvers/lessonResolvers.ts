import LessonService from "../../services/implementations/lessonService";
import {
  ILessonService,
  LessonResponseDTO,
  CreateLessonRequestDTO,
  UpdateLessonRequestDTO,
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
    lessons: async (
      _parent: undefined,
      { ids }: { ids: string[] },
    ): Promise<LessonResponseDTO[]> => {
      return Promise.all(ids.map(lessonService.getLessonById));
    },
    lessonTitles: async (
      _parent: undefined,
      { ids }: { ids: string[] },
    ): Promise<Array<string>> => {
      return lessonService.getLessonTitlesByIds(ids);
    },
  },
  Mutation: {
    createLesson: async (
      _parent: undefined,
      { lesson }: { lesson: CreateLessonRequestDTO },
    ): Promise<LessonResponseDTO> => {
      const newLesson = await lessonService.createLesson(lesson);
      return newLesson;
    },
    updateLesson: async (
      _parent: undefined,
      { id, lesson }: { id: string; lesson: UpdateLessonRequestDTO },
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
