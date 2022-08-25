import React from "react";
import { Button } from "@chakra-ui/react";

import { ButtonBlockState } from "../../../../types/ContentBlockTypes";

const CustomButton = ({
  link,
  text,
}: ButtonBlockState["content"]): React.ReactElement => {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Button>{text}</Button>
    </a>
  );
};

export default CustomButton;
