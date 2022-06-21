import React from "react";

import { ImageBlockState } from "../../../types/ModuleEditorTypes";

const ImageBlock = ({
  block: { content },
}: {
  block: ImageBlockState;
}): React.ReactElement => {
  return <img src={content.link} alt="We should put an alt" />;
};

export default ImageBlock;
