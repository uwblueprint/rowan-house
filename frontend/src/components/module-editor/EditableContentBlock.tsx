import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ContentType, ContentTypeEnum } from "../../types/ModuleEditorTypes";
import { TextBlock, ImageBlock } from "../common/content";

/* eslint-disable react/jsx-props-no-spreading */

const SelectContentBlock = (block: ContentType): React.ReactElement => {
  switch (block.type) {
    case ContentTypeEnum.TEXT:
      return <TextBlock content={block.content} />;
    case ContentTypeEnum.IMAGE:
      return <ImageBlock content={block.content} />;
    default:
      throw Error("Unknown content type given to EditableContentBlock");
  }
};

const EditableContentBlock = ({
  block,
  index,
}: {
  block: ContentType;
  index: number;
}): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Draggable key={block.id} draggableId={block.id} index={index}>
      {(provided) => (
        <VStack
          width="100%"
          padding="0.5rem 1rem"
          spacing={2}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
        >
          <Divider opacity={isHovered ? 1 : 0} />
          <Flex justify="space-between">
            <Box opacity={isHovered ? 1 : 0} {...provided.dragHandleProps}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                />
              </svg>
            </Box>
            {SelectContentBlock(block)}
          </Flex>
          <Divider opacity={isHovered ? 1 : 0} />
        </VStack>
      )}
    </Draggable>
  );
};

export default EditableContentBlock;
