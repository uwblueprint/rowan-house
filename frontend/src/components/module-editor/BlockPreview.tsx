import React from "react";
import { ContentType } from "../../types/ModuleEditorTypes";

const BlockPreview = ({ title, preview }: ContentType): React.ReactElement => {
  return (
    <div>
      {title}
      {preview}
    </div>
  );
};

export default BlockPreview;
