import React from "react";

import {
  ContentBlockProps,
  TextBlockState,
} from "../../../types/ContentBlockTypes";

const TextBlock = ({
  block: { content },
}: ContentBlockProps<TextBlockState>): React.ReactElement => {
  return <p>{content.text}</p>;
};

export default TextBlock;
