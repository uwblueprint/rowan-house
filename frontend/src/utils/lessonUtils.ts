import { v4 as uuid } from "uuid";

import {
  ContentBlockDTO,
  LessonRequest,
  LessonResponse,
} from "../APIClients/types/LessonClientTypes";
import { LessonType } from "../types/ModuleEditorTypes";
import {
  ColumnBlockState,
  ContentBlockState,
  ContentTypeEnum,
} from "../types/ContentBlockTypes";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const isBlockDTO = (block: unknown): block is ContentBlockDTO => {
  if (!isRecord(block)) return false;
  if (!(typeof block.type === "string")) return false;
  if (!isRecord(block.content)) return false;
  return true;
};

const isColumnState = (block: ContentBlockState): block is ColumnBlockState => {
  return block.type.id === ContentTypeEnum.COLUMN.id;
};

const isContentBlock = (block: unknown): block is ContentBlockState => {
  if (!isRecord(block)) return false;
  if (!isRecord(block.type)) return false;
  if (!isRecord(block.content)) return false;
  if (!(typeof block.type.id === "string")) return false;
  if (!(typeof block.id === "string")) return false;
  return true;
  // TODO: Can we create an object from the typescript definitions ?
  // const testObj = createContent(block.type.id);
  // return objectsHaveSameKeys(testObj, block.content);
};

const BlockToDTO = (block: ContentBlockState): ContentBlockDTO => {
  if (isColumnState(block)) {
    return {
      type: block.type.clientType,
      content: {
        left: block.content.left ? BlockToDTO(block.content.left) : null,
        right: block.content.right ? BlockToDTO(block.content.right) : null,
      },
    };
  }
  return {
    type: block.type.clientType,
    content: block.content,
  };
};

export const formatLessonRequest = (lesson: LessonType): LessonRequest => {
  // Remove IDs from content blocks, switch types to the titles
  const content = lesson.content.map(BlockToDTO);
  return { ...lesson, content };
};

const DTOToBlock = (block: ContentBlockDTO): ContentBlockState => {
  let { content } = block;
  if (block.type === "column") {
    const newContent: ColumnBlockState["content"] = { left: null, right: null };
    if (content.left !== null && isBlockDTO(content.left))
      newContent.left = DTOToBlock(content.left);
    if (content.right !== null && isBlockDTO(content.right))
      newContent.right = DTOToBlock(content.right);
    content = newContent;
  }
  const newBlock = {
    id: uuid(),
    type: ContentTypeEnum.from(block.type),
    content,
  };

  if (isContentBlock(newBlock)) {
    return newBlock;
  }
  throw Error(
    `Invalid block content received (${block.type} -> ${block.content})`,
  );
};

export const formatLessonResponse = (lesson: LessonResponse): LessonType => {
  // Add IDs back into content blocks, switch types to enum
  const content = lesson.content?.map(DTOToBlock);

  return {
    course: lesson.course,
    module: lesson.module,
    title: lesson.title,
    description: lesson?.description ?? undefined,
    image: lesson?.image ?? undefined,
    content: content ?? [],
  };
};
