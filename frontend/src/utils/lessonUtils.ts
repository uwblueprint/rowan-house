import { v4 as uuid } from "uuid";

import { ContentType, LessonRequest, LessonResponse } from "../APIClients/types/LessonClientTypes";
import { ContentTypeEnum, LessonType } from "../types/ModuleEditorTypes";

export const formatLessonRequest = (lesson: LessonType): LessonRequest => {
  // Remove IDs from content blocks, switch types to the titles
  const content = lesson.content.map((block) => ({
      type: block.type.title.toLowerCase() as ContentType,
      content: block.content,
  }));
  return {...lesson, content};
}

export const formatLessonResponse = (lesson: LessonResponse): LessonType => {
  // Add IDs back into content blocks, switch types to enum
  const content = lesson.content?.map((block) => {
    let type;
    switch (block.type) {
      case "text":
        type = ContentTypeEnum.TEXT;
        break;
      case "image":
        type = ContentTypeEnum.TEXT;
        break;
      default:
        throw new Error(`Invalid block type received "${block.type}"`);
    }
    return {
      id: uuid(),
      type,
      content: block.content,
    };
  });

  return {
    course: lesson.course,
    module: lesson.module,
    title: lesson.title,
    description: lesson?.description ?? undefined,
    image: lesson?.image ?? undefined,
    content: content ?? [],
  }
}