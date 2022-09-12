import { SimpleGrid } from "@chakra-ui/react";
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
    <SimpleGrid
      w="100%"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gap="2rem"
      alignItems="start"
    >
      {content.cards.map((card, i) => (
        <FlipBlock key={i} {...card} />
      ))}
    </SimpleGrid>
  );
};

export default FlipCardBlock;
