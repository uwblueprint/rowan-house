import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";

import {
  ContentBlockProps,
  ColumnBlockState,
} from "../../../../types/ContentBlockTypes";
import ColumnContent from "./ColumnContent";

const ColumnBlock = ({
  block: { content, id },
  editable,
}: ContentBlockProps<ColumnBlockState>): React.ReactElement => {
  console.log(editable);

  return (
    <Grid templateColumns="repeat(2, 1fr)" w="100%">
      <Droppable droppableId={`${id} left column"`}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            borderWidth="3px"
            borderRightWidth="1.5px"
            margin="1rem"
            width="100%"
            minHeight="20rem"
          >
            {content.left && <ColumnContent block={content.left} index={0} editable={editable}/>}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <Droppable droppableId={`${id} right column"`}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            borderWidth="3px"
            borderLeftWidth="1.5px"
            margin="1rem"
            width="100%"
            minHeight="20rem"
          >
            {content.right && <ColumnContent block={content.right} index={0} editable={editable}/>}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Grid>
  );
};

export default ColumnBlock;
