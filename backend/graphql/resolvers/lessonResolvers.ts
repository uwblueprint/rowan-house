import LessonService from "../../services/implementations/lessonService";
import {
  ILessonService,
  LessonResponseDTO,
  CreateLessonRequestDTO,
  UpdateLessonRequestDTO,
} from "../../services/interfaces/ILessonService";
import { GraphQLScalarType, Kind } from 'graphql';
import { ContentBlock } from "../../types/contentBlockType";

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
