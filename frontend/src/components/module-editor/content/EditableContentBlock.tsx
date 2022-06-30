import { Box, Divider, Flex, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ContentBlockState } from "../../../types/ContentBlockTypes";
import { TextBlock, ImageBlock } from "../../common/content";
import DeleteModal from "../../common/DeleteModal";
import EditContentOptionsMenu from "../EditContentOptionsMenu";

import { ReactComponent as DragHandleIconSvg } from "../../../assets/DragHandle.svg";
import { EditImageModal, EditTextModal } from "./modals";
import createContentBlockRenderers, {
  EmptyConfigEntry as Empty,
} from "../../common/content/ContentBlockRenderer";

import EditorContext from "../../../contexts/ModuleEditorContext";

enum ModalType {
  EDIT = "edit",
  DELETE = "delete",
}

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
  const [modalType, setModalType] = useState(ModalType.EDIT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(EditorContext);

  if (!context) return <></>;
  const { dispatch } = context;

  const deleteContentBlock = () => {
    // const { id } = block;
    dispatch({
      type: "delete-block",
      value: index,
    });

    onClose();
  };

  const openModal = (modalConfig: ModalType) => {
    setModalType(modalConfig);
    onOpen();
  };

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
              onEditClick={() => openModal(ModalType.EDIT)}
              onCopyClick={() => {}}
              onDeleteClick={() => openModal(ModalType.DELETE)}
            />
          </Flex>
          <Divider opacity={isHovered ? 1 : 0} />
          {EDIT_MODALS.render({ isOpen, onClose, block, index })}
          {/* TODO: only allow text changes for text blocks */}
          {modalType === ModalType.DELETE && (
            <DeleteModal
              name="Content Block"
              isOpen={isOpen}
              onConfirm={deleteContentBlock}
              onCancel={onClose}
            />
          )}
        </VStack>
      )}
    </Draggable>
  );
};

export default EditableContentBlock;
