import React from "react";
import { Heading } from "@chakra-ui/react";
import { ValidHeadingSizes } from "../../types/ModuleEditorTypes";

interface HeadingState {
  size: string;
  text: string;
}

const sizeToHeadingType = (size: string) => {
  switch (size) {
    case ValidHeadingSizes.heading1:
      return "h1";
    case ValidHeadingSizes.heading2:
      return "h2";
    case ValidHeadingSizes.heading3:
      return "h3";
    case ValidHeadingSizes.heading4:
      return "h4";
    default:
      return "h1";
  }
};

const CustomHeading = ({ size, text }: HeadingState): React.ReactElement => {
  return (
    <Heading as={sizeToHeadingType(size)} fontSize={size}>
      {text}
    </Heading>
  );
};

export default CustomHeading;
