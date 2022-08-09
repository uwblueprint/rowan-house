import React from "react";

import { Button } from "@chakra-ui/react";

import {
  ContentBlockProps,
  ButtonBlockState,
} from "../../../types/ContentBlockTypes";

const ButtonBlock = ({
  block: { content },
}: ContentBlockProps<ButtonBlockState>): React.ReactElement => {
  return (
    <a href={content.link} target="_blank" rel="noreferrer">
      <Button>{content.text}</Button>
    </a>
  );
};

export default ButtonBlock;
