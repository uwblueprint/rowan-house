import { ContentBlock, ImageBlock, TextBlock, VideoBlock } from "../../types";

type Type = "string" | "integer" | "boolean";

const allowableContentTypes = new Set([
  "text/plain",
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/gif",
]);

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const validatePrimitive = (value: any, type: Type): boolean => {
  if (value === undefined || value === null) return false;

  switch (type) {
    case "string": {
      return typeof value === "string";
    }
    case "boolean": {
      return typeof value === "boolean";
    }
    case "integer": {
      return typeof value === "number" && Number.isInteger(value);
    }
    default: {
      return false;
    }
  }
};

export const validateArray = (value: any, type: Type): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    Array.isArray(value) &&
    value.every((item) => validatePrimitive(item, type))
  );
};

export const validateContent = (content: ContentBlock): boolean => {
  if (content.type === undefined || content.type === null) return false;

  switch (content.type) {
    case "text": {
      const text = content as TextBlock;
      return text.content.text != null;
    }
    case "image": {
      const image = content as ImageBlock;
      return image.content.link != null;
    }
    case "video": {
      const video = content as VideoBlock;
      return video.content.link != null;
    }
    default: {
      return false;
    }
  }
};

export const validateContentList = (contentList: ContentBlock[]): boolean => {
  return contentList.some((contentBlock) => !validateContent(contentBlock));
};

export const validateFileType = (mimetype: string): boolean => {
  return allowableContentTypes.has(mimetype);
};

export const getApiValidationError = (
  fieldName: string,
  type: Type,
  isArray = false,
): string => {
  return `The ${fieldName} is not a ${type}${isArray ? " Array" : ""}`;
};

export const getFileTypeValidationError = (mimetype: string): string => {
  const allowableContentTypesString = [...allowableContentTypes].join(", ");
  return `The file type ${mimetype} is not one of ${allowableContentTypesString}`;
};
