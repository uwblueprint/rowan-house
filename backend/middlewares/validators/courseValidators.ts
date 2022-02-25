import { Request, Response, NextFunction } from "express";
import {
  getApiValidationError,
  validateArray,
  validateLink,
  validatePrimitive,
} from "./util";
import { getErrorMessage } from "../../utilities/errorUtils";

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
  } else if (!validateLink(body.image)) {
    return res.status(400).send(getApiValidationError("image", "link"));
  }
  if (!validatePrimitive(body.previewImage, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("previewImage", "string"));
  } else if (!validateLink(body.previewImage)) {
    return res.status(400).send(getApiValidationError("previewImage", "link"));
  }
  if (!validateArray(body.lessons, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("lessons", "string", true));
  }
  return next();
};
