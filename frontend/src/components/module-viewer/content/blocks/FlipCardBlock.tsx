import React from "react";

import {
  ContentBlockProps,
  FlipCardBlockState,
} from "../../../../types/ContentBlockTypes";

const FlipCardBlock = ({
  block: { content },
}: ContentBlockProps<FlipCardBlockState>): React.ReactElement => {
  return <p>{ content.cards.length }</p>;
};

export default FlipCardBlock;
