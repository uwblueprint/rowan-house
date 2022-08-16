import {
  Box,
  Center,
  Divider,
  Flex,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import EditorContext from "../../../contexts/ModuleEditorContext";
import RenderComponents from "./helpers/ContentBlockTable";
import { ContentBlockState } from "../../../types/ContentBlockTypes";

import ColumnBlock from "./blocks/column/ColumnBlock";
import DeleteModal from "../../common/DeleteModal";
import EditContentOptionsMenu from "../EditContentOptionsMenu";
import { ReactComponent as DragHandleIconSvg } from "../../../assets/DragHandle.svg";
import { EmptyConfigModal } from "./helpers/ContentBlockTableUtils";

// Create content block table, but add column since it defaults to Empty
const [CONTENT_BLOCKS, EDIT_MODALS] = RenderComponents({
  column: {
    renderBlock: ColumnBlock,
    renderEditModal: EmptyConfigModal,
  },
});

const ContentBlock = ({
  block,
  index,
  editable = true,
}: {
  block: ContentBlockState;
  index: number;
  editable?: boolean;
}): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const context = useContext(EditorContext);

  if (!context) return <></>;
  const { dispatch } = context;

  const deleteContentBlock = () => {
    dispatch({
      type: "delete-block",
      value: index,
    });
    onDeleteModalClose();
  };

  const editContentBlock = <T extends ContentBlockState>(content: T['content']) => {
    dispatch({
      type: "update-block",
      value: { index, content },
    });
    onEditModalClose();
  };

  return (
    <Draggable
      key={block.id}
      draggableId={block.id}
      index={index}
      isDragDisabled={!editable}
    >
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
          {editable ? (
            <>
              <Divider opacity={isHovered ? 1 : 0} />
              <Flex width="100%" justify="space-between">
                <Box opacity={isHovered ? 1 : 0} {...provided.dragHandleProps}>
                  <DragHandleIconSvg />
                </Box>
                <Center w="100%" padding="2rem">
                  {CONTENT_BLOCKS.render({ block, index, editable })}
                </Center>
                <EditContentOptionsMenu
                  isVisible={isHovered}
                  onEditClick={onEditModalOpen} // block.type.clientType !== 'column' ? onEditModalOpen : null
                  onCopyClick={() => {}}
                  onDeleteClick={onDeleteModalOpen}
                />
              </Flex>
              <Divider opacity={isHovered ? 1 : 0} />
              {EDIT_MODALS.render({
                isOpen: isEditModalOpen,
                onClose: onEditModalClose,
                block,
                onSave: editContentBlock,
              })}
              <DeleteModal
                name="Content Block"
                isOpen={isDeleteModalOpen}
                onConfirm={deleteContentBlock}
                onCancel={onDeleteModalClose}
              />
            </>
          ) : (
            <Center w="100%" padding="2rem">
              {CONTENT_BLOCKS.render({ block, index, editable })}
            </Center>
          )}
        </VStack>
      )}
    </Draggable>
  );
};

export default ContentBlock;
