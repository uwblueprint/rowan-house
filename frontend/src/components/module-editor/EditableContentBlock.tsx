import React from "react";
import { Content, ContentTextProps, ContentType } from "../../types/ModuleEditorTypes";
import ImageBlock from "../common/content/ImageBlock";
import TextBlock from "../common/content/TextBlock";

const EditableContentBlock = ({content}: {content: Content}): React.ReactElement => {
  const SelectContentBlock = (): React.ReactElement => {
    switch (content.type) {
      case ContentType.text:
        return <TextBlock content={content}/>;
      case ContentType.image:
        return <ImageBlock content={content}/>;
      default:
        throw Error("Unknown content type given to EditableContentBlock")
    }
  }

  return (
    <div>
      {SelectContentBlock()}
    </div>
  );
};

export default EditableContentBlock;
