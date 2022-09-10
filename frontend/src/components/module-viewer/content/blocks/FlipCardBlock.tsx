import { HStack } from "@chakra-ui/react";
import React from "react";

import FlipBlock from "./FlipCard";
import {
  ContentBlockProps,
  FlipCardBlockState,
} from "../../../../types/ContentBlockTypes";

const FlipCardBlock = ({
  block: { content },
}: ContentBlockProps<FlipCardBlockState>): React.ReactElement => {
  

  return (
    <HStack spacing="2rem">
      {content.cards.map((card, i) => (
        <FlipBlock key={i} {...card} />
      ))}
    </HStack>
  );
};

export default FlipCardBlock;
