import React from "react";

import {
  ContentBlockProps,
  MatchBlockState,
} from "../../../../types/ContentBlockTypes";
import CustomButton from "./CustomButton";

const MatchBlock = ({
  block: { content },
  editable,
}: ContentBlockProps<MatchBlockState>): React.ReactElement => {
  return <CustomButton text={content.text} link={content.link} />;
};

export default MatchBlock;
