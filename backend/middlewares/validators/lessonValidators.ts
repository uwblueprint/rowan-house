import { Request, Response, NextFunction } from "express";
import { getApiValidationError, validatePrimitive } from "./util";
import { getErrorMessage } from "../../utilities/errorUtils";
import { ContentBlock, ImageBlock, TextBlock, VideoBlock } from "../../types/contentBlockType";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable-next-line import/prefer-default-export */
export const lessonRequestDtoValidator = async (
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
  // content validation
  if(!validateContentList(body.content)){
    return res.status(400).send("There was an error in the lesson content.")
  }
  if (typeof body.content !== "object") {
    return res.status(400).send("There was an error");
  }
  return next();
};


export const validateContent = (content: ContentBlock): boolean => {
  if (content.type === undefined || content.type === null) return false;

  switch (content.type) {
    case "text": {
      let text = content as TextBlock;
      return text.content.text != null;
    }
    case "image": {
      let image = content as ImageBlock;
      return image.content.link != null;
    }
    case "video": {
      let video = content as VideoBlock;
      return video.content.link != null;
    }
    default: {
      return false;
    }
  }
};

export const validateContentList = (contentList: ContentBlock[]): boolean => {
  contentList.forEach((contentBlock) => {
    if(!validateContent(contentBlock)){
      return false;
    }
  });
  return true;
}