import React from "react";
import {
  Content,
  ContentTextProps,
  ContentImageProps,
  ContentType,
} from "../../types/ModuleEditorTypes";

import { TextBlock, ImageBlock } from "../common/content";

const EditableContentBlock = ({
  content,
}: {
  content: Content;
}): React.ReactElement => {
  const SelectContentBlock = (): React.ReactElement => {
    switch (content.type) {
      case ContentType.TEXT:
        return <TextBlock content={content.content as ContentTextProps} />;
      case ContentType.IMAGE:
        return <ImageBlock content={content.content as ContentImageProps} />;
      default:
        throw Error("Unknown content type given to EditableContentBlock");
    }
  };

  return <div>{SelectContentBlock()}</div>;
};

export default EditableContentBlock;
