import { v4 as uuid } from "uuid";

import {
  LessonRequest,
  LessonResponse,
} from "../APIClients/types/LessonClientTypes";
import { LessonType } from "../types/ModuleEditorTypes";
import { ContentBlockState, ContentTypeEnum } from "../types/ContentBlockTypes";

export const formatLessonRequest = (lesson: LessonType): LessonRequest => {
  // Remove IDs from content blocks, switch types to the titles
  const content = lesson.content.map((block) => ({
    type: block.type.clientType,
    content: block.content,
  }));
  return { ...lesson, content };
};

export const formatLessonResponse = (lesson: LessonResponse): LessonType => {
  // Add IDs back into content blocks, switch types to enum
  const content = lesson.content?.map(({ type, content: blockContent }) => ({
    id: uuid(),
    type: ContentTypeEnum.from(type),
    content: blockContent,
  }));

  return {
    course: lesson.course,
    module: lesson.module,
    title: lesson.title,
    description: lesson?.description ?? undefined,
    image: lesson?.image ?? undefined,
    content: (content ?? []) as ContentBlockState[],
  };
};
