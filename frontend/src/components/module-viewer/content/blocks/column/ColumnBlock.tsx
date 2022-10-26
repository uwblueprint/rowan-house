import React from "react";
import { Box, Grid } from "@chakra-ui/react";

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
  // If we are on the learner's side and one of the columns is empty
  if (!editable && (content.left === null || content.right === null)) {
    // Figure out which column has content, if any
    const side = content.left ? "left" : "right";
    // If both columns are empty, don't render anything
    if (!content[side]) return <></>;
    // If only one column has content, render w/ full width
    return (
      <Box padding="2rem">
        <ColumnContent
          block={content[side]}
          columnID={id}
          index={index}
          side={side}
          editable={editable}
        />
      </Box>
    );
  }

  return (
    <Grid
      templateColumns={["100%", "100%", "50% 50%"]}
      gap="1rem"
      w="100%"
      padding={["0", "0", "1rem"]}
    >
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
