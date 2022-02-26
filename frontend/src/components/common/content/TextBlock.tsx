import React from "react";
import { ContentTextProps } from "../../../types/ModuleEditorTypes";

const TextBlock = ({
  content,
}: {
  content: ContentTextProps;
}): React.ReactElement => {
  return <p>{content.text}</p>;
};

export default TextBlock;
