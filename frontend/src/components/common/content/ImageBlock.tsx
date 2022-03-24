import React from "react";

import { ContentProps } from "../../../types/ModuleEditorTypes";

const ImageBlock = ({
  content,
}: {
  content: ContentProps;
}): React.ReactElement => {
  return <img src={content.link} alt="We should put an alt" />;
};

export default ImageBlock;
