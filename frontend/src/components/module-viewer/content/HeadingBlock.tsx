import React from "react";
import CustomHeading from "../CustomHeading";
import {
  ContentBlockProps,
  HeadingBlockState,
} from "../../../types/ContentBlockTypes";

const HeadingBlock = ({
  block: { content },
}: ContentBlockProps<HeadingBlockState>): React.ReactElement => {
  return <CustomHeading size={content.size} text={content.text} />;
};

export default HeadingBlock;
