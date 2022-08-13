import { Heading } from "@chakra-ui/react";
import React from "react";

import {
  ContentBlockProps,
  HeadingBlockState,
} from "../../../types/ContentBlockTypes";

const HeadingBlock = ({
  block: { content },
}: ContentBlockProps<HeadingBlockState>): React.ReactElement => {
  return <Heading fontSize={content.size}>{content.text}</Heading>;
};

export default HeadingBlock;
