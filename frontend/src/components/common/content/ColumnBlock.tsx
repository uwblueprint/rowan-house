import React from "react";

import {
  ContentBlockProps,
  ColumnBlockState,
} from "../../../types/ContentBlockTypes";

const ColumnBlock = ({
  block: { content },
}: ContentBlockProps<ColumnBlockState>): React.ReactElement => {
  return <p>{content.left}{content.right}</p>;
};

export default ColumnBlock;
