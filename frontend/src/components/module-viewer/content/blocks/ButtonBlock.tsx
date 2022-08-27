import React from "react";

import {
  ContentBlockProps,
  ButtonBlockState,
} from "../../../../types/ContentBlockTypes";
import CustomButton from "./CustomButton";

const ButtonBlock = ({
  block: { content },
}: ContentBlockProps<ButtonBlockState>): React.ReactElement => {
  return <CustomButton text={content.text} link={content.link} />;
};

export default ButtonBlock;
