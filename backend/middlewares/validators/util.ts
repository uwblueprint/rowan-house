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
    (value) &&
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
    (object) &&
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
