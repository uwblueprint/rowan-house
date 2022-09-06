import {
  ButtonBlock,
  ColumnBlock,
  ContentBlock,
  HeadingBlock,
  ImageBlock,
  MatchBlock,
  TextBlock,
  VideoBlock,
} from "../../types";

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
    value &&
    typeof value === "object" &&
    Array.isArray(value) &&
    value.every((item) => validatePrimitive(item, type))
  );
};

export const validateObject = (
  object: { [field: string]: any },
  types: { [field: string]: any },
): boolean => {
  return (
    object &&
    typeof object === "object" &&
    Object.entries(object).every(([key, value]) => {
      // x[] indicates an array of type x, and [] takes up the last two chars
      // Therefore, slice the last two chars to check if array, then pass in type itself
      if (key.slice(-2) === "[]" && Array.isArray(value)) {
        return validateArray(value, types[key.slice(0, -2)]);
      }
      if (typeof object === "object") {
        return validateObject(object, types[key]);
      }
      return validatePrimitive(value, types[key]);
    })
  );
};

export const validateContent = (content: ContentBlock): boolean => {
  if (!content.type) return false;

  switch (content.type) {
    case "button": {
      const button = content as ButtonBlock;
      return button.content.link != null && button.content.text != null;
    }
    case "column": {
      const column = content as ColumnBlock;
      return (
        (column.content.left === null ||
          validateContent(column.content.left)) &&
        (column.content.right === null || validateContent(column.content.right))
      );
    }
    case "match": {
      const match = content as MatchBlock;
      return (
        match.content.question != null && match.content.matches.length >= 2
      );
    }
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
    case "heading": {
      const heading = content as HeadingBlock;
      return heading.content.size != null && heading.content.text != null;
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
