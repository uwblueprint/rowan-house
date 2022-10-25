import React from "react";

import {
  ContentBlockProps,
  ImageBlockState,
} from "../../../../types/ContentBlockTypes";

const ImageBlock = ({
  block: {
    content: { path, description },
  },
}: ContentBlockProps<ImageBlockState>): React.ReactElement => {
  return <img src={path} alt={description} />;
};

export default ImageBlock;
