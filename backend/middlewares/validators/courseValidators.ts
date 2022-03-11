import { Request, Response, NextFunction } from "express";
import {
  getApiValidationError,
  validateObject,
  validatePrimitive,
} from "./util";
import { getErrorMessage } from "../../utilities/errorUtils";

const VALID_MODULES = {
  id: {
    title: "string",
    description: "string",
    image: "string",
    preview_image: "string",
    published: "boolean",
    lessons: "string",
  },
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable-next-line import/prefer-default-export */
export const courseRequestDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let body;
  try {
    body = JSON.parse(req.body.body);
  } catch (e: unknown) {
    return res.status(400).send(getErrorMessage(e));
  }
  if (!validatePrimitive(body.title, "string")) {
    return res.status(400).send(getApiValidationError("title", "string"));
  }
  if (!validatePrimitive(body.description, "string")) {
    return res.status(400).send(getApiValidationError("description", "string"));
  }
  if (!validatePrimitive(body.image, "string")) {
    return res.status(400).send(getApiValidationError("image", "string"));
  }
  if (!validatePrimitive(body.previewImage, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("previewImage", "string"));
  }
  if (!validateObject(body.modules, VALID_MODULES)) {
    return res.status(400).send("modules is not a valid module");
  }
  return next();
};
