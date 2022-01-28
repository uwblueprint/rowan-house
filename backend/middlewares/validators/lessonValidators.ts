import { Request, Response, NextFunction } from "express";
import {
  getApiValidationError,
  validateArray,
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
  if (!validatePrimitive(body.course, "string")) {
    return res.status(400).send(getApiValidationError("course", "string"));
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
  if (!validateArray(body.content, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("content", "string"));
  }
  return next();
};