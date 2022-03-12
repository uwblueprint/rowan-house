import React from "react";
import {
  ContentType,
  ContentTextProps,
  ContentImageProps,
  ContentTypeEnum,
} from "../../types/ModuleEditorTypes";

import { TextBlock, ImageBlock } from "../common/content";

const EditableContentBlock = ({
  content,
}: {
  content: ContentType;
}): React.ReactElement => {
  const SelectContentBlock = (): React.ReactElement => {
    switch (content.type) {
      case ContentTypeEnum.TEXT:
        return <TextBlock content={content.content as ContentTextProps} />;
      case ContentTypeEnum.IMAGE:
        return <ImageBlock content={content.content as ContentImageProps} />;
      default:
        throw Error("Unknown content type given to EditableContentBlock");
    }
  };

  return <div>{SelectContentBlock()}</div>;
};

export default EditableContentBlock;
