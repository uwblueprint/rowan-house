import React from "react";
import { ContentType } from "../../types/ModuleEditorTypes";

const BlockPreview = ({ type }: { type: ContentType }): React.ReactElement => {
  let title = "";

  switch (type) {
    case ContentType.text:
      title = "Text";
      break;
    case ContentType.image:
      title = "Image";
      break;
    default:
      throw Error("Unknown content type given to BlockPreview");
  }

  return <div>{title}</div>;
};

export default BlockPreview;
