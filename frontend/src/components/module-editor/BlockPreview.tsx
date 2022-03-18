import React from "react";
import { ContentTypeEnum } from "../../types/ModuleEditorTypes";

const BlockPreview = ({
  title,
  preview,
}: ContentTypeEnum): React.ReactElement => {
  return (
    <div>
      {title}
      {preview}
    </div>
  );
};

export default BlockPreview;
