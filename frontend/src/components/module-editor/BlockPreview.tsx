import React from "react";
import { Box } from "@chakra-ui/react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

import { ContentTypeEnum } from "../../types/ModuleEditorTypes";

/* eslint-disable react/jsx-props-no-spreading */

const BlockStyle = ({
  content,
  className,
}: {
  className?: string;
  content: ContentTypeEnum;
}): React.ReactElement => {
  return (
    <Box
      border="1px solid grey"
      borderRadius="1rem"
      padding="1rem 2rem"
      margin=".5rem"
      className={className}
    >
      {content.title}
    </Box>
  );
};

interface BlockPreviewProps {
  content: ContentTypeEnum;
  index: number;
}

const BlockPreview = ({
  content,
  index,
}: BlockPreviewProps): React.ReactElement => {
  return (
    <Draggable key={content.id} draggableId={content.id} index={index}>
      {(provided: DraggableProvided, _snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          >
            <BlockStyle content={content} />
          </div>
          {_snapshot.isDragging && (
            <BlockStyle content={content} className="clone" />
          )}
        </>
      )}
    </Draggable>
  );
};

export default BlockPreview;
