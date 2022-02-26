import React from "react";
import { Content, ContentTextProps } from "../../../types/ModuleEditorTypes";

const TextBlock = ({content}: {content: Content}): React.ReactElement => {
  const info = content.content as ContentTextProps;

  return (
    <p>
      {info.text}
    </p>
  );
};

export default TextBlock;
