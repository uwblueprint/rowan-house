import React from "react";
import { ContentImageProps } from "../../../types/ModuleEditorTypes";

const TextBlock = ({
  content,
}: {
  content: ContentImageProps;
}): React.ReactElement => {
  return <img src={content.link} alt="We should put an alt" />;
};

export default TextBlock;
