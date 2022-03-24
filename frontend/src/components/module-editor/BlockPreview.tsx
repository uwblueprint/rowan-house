import React from "react";
import { Box } from "@chakra-ui/react";
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

import { ContentTypeEnum } from "../../types/ModuleEditorTypes";

/* eslint-disable react/jsx-props-no-spreading */

const BlockStyle = ({content}: {content: ContentTypeEnum}): React.ReactElement => {
  return (
    <Box>
      {content.title}
    </Box>
  );
}

interface BlockPreviewProps {
  content: ContentTypeEnum,
  index: number
}

const BlockPreview = ({content, index}: BlockPreviewProps): React.ReactElement => {
  return (
    <Draggable key={content.id}
      draggableId={content.id}
      index={index}>
      {(provided: DraggableProvided, snapshot) => (
        <>
          <div
            className='item'	
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            >
            <BlockStyle content={content} />
          </div>
          {snapshot.isDragging && (
            <BlockStyle content={content} />
          )}
        </>
      )}
    </Draggable>
  );
};

export default BlockPreview;
