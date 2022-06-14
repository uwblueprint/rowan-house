import { Box, Divider, Flex, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ContentBlock, ContentTypeEnum ,
  EditorContextType,
} from "../../types/ModuleEditorTypes";
import { TextBlock, ImageBlock } from "../common/content";
import EditContentOptionsMenu from "./EditContentOptionsMenu";

import { ReactComponent as DragHandleIconSvg } from "../../assets/DragHandle.svg";
import EditTextModal from "../admin/EditTextModal";
import EditorContext from "../../contexts/ModuleEditorContext";

/* eslint-disable react/jsx-props-no-spreading */

const SelectContentBlock = (block: ContentBlock): React.ReactElement => {
  const { type, content } = block;

  switch (type) {
    case ContentTypeEnum.TEXT:
      return <TextBlock content={content} />;
    case ContentTypeEnum.IMAGE:
      return <ImageBlock content={content} />;
    default:
      throw Error(
        `Unknown content type given to EditableContentBlock: "${type.title}"`,
      );
  }
};

const EditableContentBlock = ({
  block,
  index,
  context,
}: {
  block: ContentBlock;
  index: number;
  context: EditorContextType;
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
            {SelectContentBlock(block)}
            <EditContentOptionsMenu
              isVisible={isHovered}
              onEditClick={() => {
                onOpen();
              }}
              onCopyClick={() => {}}
              onDeleteClick={() => {}}
            />
          </Flex>
          <Divider opacity={isHovered ? 1 : 0} />
          <EditTextModal
            isOpen={isOpen}
            onClose={onClose}
            block={block}
            index={index}
            context={context}
          />
        </VStack>
      )}
    </Draggable>
  );
};

export default EditableContentBlock;
