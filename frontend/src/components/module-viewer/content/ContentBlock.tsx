import { Box, Divider, Flex, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ContentBlockState } from "../../../types/ContentBlockTypes";
<<<<<<< HEAD
import {
  TextBlock,
  ImageBlock,
  VideoBlock,
  HeadingBlock,
} from "../../common/content";
=======
import { ButtonBlock, ColumnBlock, TextBlock, ImageBlock, VideoBlock } from "../../common/content";
>>>>>>> 7330b6d (Added button, column)
import DeleteModal from "../../common/DeleteModal";
import EditContentOptionsMenu from "../EditContentOptionsMenu";

import { ReactComponent as DragHandleIconSvg } from "../../../assets/DragHandle.svg";
<<<<<<< HEAD
import {
  EditTextModal,
  EditImageModal,
  EditVideoModal,
  EditHeadingModal,
} from "./modals";
=======
import { EditButtonModal, EditTextModal, EditImageModal, EditVideoModal } from "./modals";
>>>>>>> 7330b6d (Added button, column)
import createContentBlockRenderers, {
  EmptyConfigEntry as Empty,
} from "../../common/content/ContentBlockRenderer";

import EditorContext from "../../../contexts/ModuleEditorContext";

const [CONTENT_BLOCKS, EDIT_MODALS] = createContentBlockRenderers({
<<<<<<< HEAD
  column: Empty,
  heading: {
    renderBlock: HeadingBlock,
    renderEditModal: EditHeadingModal,
  },
=======
  column: {
    renderBlock: ColumnBlock,
    renderEditModal: () => null,
  },
  heading: Empty,
>>>>>>> 7330b6d (Added button, column)
  text: {
    renderBlock: TextBlock,
    renderEditModal: EditTextModal,
  },
  link: Empty,
  button: {
    renderBlock: ButtonBlock,
    renderEditModal: EditButtonModal,
  },
  image: {
    renderBlock: ImageBlock,
    renderEditModal: EditImageModal,
  },
  video: {
    renderBlock: VideoBlock,
    renderEditModal: EditVideoModal,
  },
  audio: Empty,
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
                {CONTENT_BLOCKS.render({ block })}
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
                index,
              })}
              <DeleteModal
                name="Content Block"
                isOpen={isDeleteModalOpen}
                onConfirm={deleteContentBlock}
                onCancel={onDeleteModalClose}
              />
            </>
          ) : (
            <Flex width="100%" justify="center">
              {CONTENT_BLOCKS.render({ block })}
            </Flex>
          )}
        </VStack>
      )}
    </Draggable>
  );
};

export default ContentBlock;
