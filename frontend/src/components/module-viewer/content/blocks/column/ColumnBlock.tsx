import React from "react";
import { Grid } from "@chakra-ui/react";

import {
  ContentBlockProps,
  ColumnBlockState,
} from "../../../../../types/ContentBlockTypes";
import ColumnContent from "./ColumnContent";

const ColumnBlock = ({
  block: { content, id },
  index,
  editable,
}: ContentBlockProps<ColumnBlockState>): React.ReactElement => {
  if (index === undefined) {
    throw Error("Index passed to column component was undefined");
  }

  // If we are on the learner's side and one of the columns is empty
  if (!editable && (content.left === null || content.right === null)) {
    // Figure out which column has content, if any
    const side = content.left ? "left" : "right";
    // If both columns are empty, don't render anything
    if (!content[side]) return <></>;
    // If only one column has content, render w/ full width
    return (
      <ColumnContent
        block={content[side]}
        columnID={id}
        index={index}
        side={side}
        editable={editable}
      />
    );
  }

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="1rem" w="100%">
      <ColumnContent
        block={content.left}
        columnID={id}
        index={index}
        side="left"
        editable={editable}
      />
      <ColumnContent
        block={content.right}
        columnID={id}
        index={index}
        side="right"
        editable={editable}
      />
    </Grid>
  );
};

export default ColumnBlock;
