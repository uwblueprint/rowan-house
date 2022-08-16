import {
  Box,
  Center,
  Flex,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ColumnBlockParam, ColumnBlockState, ContentBlockState } from "../../../../../types/ContentBlockTypes";
import DeleteModal from "../../../../common/DeleteModal";
import EditContentOptionsMenu from "../../../EditContentOptionsMenu";

import { ReactComponent as DragHandleIconSvg } from "../../../../../assets/DragHandle.svg";
import EditorContext from "../../../../../contexts/ModuleEditorContext";
import RenderComponents from "../../helpers/ContentBlockTable";

const [CONTENT_BLOCKS, EDIT_MODALS] = RenderComponents();

const ColumnContent = ({
  block,
  index,
  side,
  editable = true,
}: {
  block: ContentBlockState;
  index: number;
  side: ColumnBlockParam;
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

  const deleteColumn = () => {
    const content = {
      [side]: null
    } as ColumnBlockState['content'];
    dispatch({
      type: "update-block",
      value: { index, content },
    });
    onDeleteModalClose();
  };

  const editColumn = <T extends ContentBlockState>(sideUpdates: T['content']) => {
    const content = {
      [side]: {
        ...block,
        content: {
          ...block.content,
          ...sideUpdates,
        }
      }
    } as ColumnBlockState['content'];
    console.log(content);
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
              <Flex width="100%" justify="space-between">
                <Box opacity={isHovered ? 1 : 0} {...provided.dragHandleProps}>
                  <DragHandleIconSvg />
                </Box>
                <Center w="100%" padding=".2rem">
                  {CONTENT_BLOCKS.render({ block, index, editable })}
                </Center>
                <EditContentOptionsMenu
                  isVisible={isHovered}
                  onEditClick={onEditModalOpen} // block.type.clientType !== 'column' ? onEditModalOpen : null
                  onCopyClick={() => {}}
                  onDeleteClick={onDeleteModalOpen}
                />
              </Flex>
              {EDIT_MODALS.render({
                isOpen: isEditModalOpen,
                onClose: onEditModalClose,
                block,
                onSave: editColumn,
              })}
              <DeleteModal
                name="Content Block"
                isOpen={isDeleteModalOpen}
                onConfirm={deleteColumn}
                onCancel={onDeleteModalClose}
              />
            </>
          ) : (
            <Center w="100%" padding=".2rem">
              {CONTENT_BLOCKS.render({ block, index, editable })}
            </Center>
          )}
        </VStack>
      )}
    </Draggable>
  );
};

export default ColumnContent;
