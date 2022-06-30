import { Box, Divider, Flex, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ContentBlockState } from "../../../types/ContentBlockTypes";
import { TextBlock, ImageBlock } from "../../common/content";
import EditContentOptionsMenu from "../EditContentOptionsMenu";

import { ReactComponent as DragHandleIconSvg } from "../../../assets/DragHandle.svg";
import { EditImageModal, EditTextModal } from "./modals";
import createContentBlockRenderers, {
  EmptyConfigEntry as Empty,
} from "../../common/content/ContentBlockRenderer";

/* eslint-disable react/jsx-props-no-spreading */

const [CONTENT_BLOCKS, EDIT_MODALS] = createContentBlockRenderers({
  column: Empty,
  heading: Empty,
  text: {
    renderBlock: TextBlock,
    renderEditModal: EditTextModal,
  },
  link: Empty,
  button: Empty,
  image: {
    renderBlock: ImageBlock,
    renderEditModal: EditImageModal,
  },
  video: Empty,
  audio: Empty,
});

const EditableContentBlock = ({
  block,
  index,
}: {
  block: ContentBlockState;
  index: number;
}): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Flex width="100%" justify="space-between">
            <Box opacity={isHovered ? 1 : 0} {...provided.dragHandleProps}>
              <DragHandleIconSvg />
            </Box>
            {CONTENT_BLOCKS.render({ block })}
            <EditContentOptionsMenu
              isVisible={isHovered}
              onEditClick={onOpen}
              onCopyClick={() => {}}
              onDeleteClick={() => {}}
            />
          </Flex>
          <Divider opacity={isHovered ? 1 : 0} />
          {EDIT_MODALS.render({ isOpen, onClose, block, index })}
        </VStack>
      )}
    </Draggable>
  );
};

export default EditableContentBlock;
