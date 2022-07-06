import React from "react";

import {
  ContentBlockProps,
  ImageBlockState,
} from "../../../types/ContentBlockTypes";

const ImageBlock = ({
  block: { content },
}: ContentBlockProps<ImageBlockState>): React.ReactElement => {
  return <img src={content.link} alt="We should put an alt" />;
};

export default ImageBlock;
