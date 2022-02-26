import React from "react";
import { Content, ContentImageProps } from "../../../types/ModuleEditorTypes";

const TextBlock = ({content}: {content: Content}): React.ReactElement => {
  const info = content.content as ContentImageProps;

  return (
    <img 
      src={info.link}
      alt="We should put an alt"
      />
  );
};

export default TextBlock;
