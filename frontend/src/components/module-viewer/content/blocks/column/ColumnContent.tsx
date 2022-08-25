import { Box, Center, Flex, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import {
  ColumnBlockParam,
  ColumnBlockState,
  ContentBlockState,
} from "../../../../../types/ContentBlockTypes";
import DeleteModal from "../../../../common/DeleteModal";
import EditContentOptionsMenu from "../../../EditContentOptionsMenu";

import EditorContext from "../../../../../contexts/ModuleEditorContext";
import RenderComponents from "../../helpers/ContentBlockTable";

const [CONTENT_BLOCKS, EDIT_MODALS] = RenderComponents();

const ColumnContent = ({
  block,
  columnID,
  index,
  side,
  editable = true,
}: {
  block: ContentBlockState | null;
  columnID: string;
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
      [side]: null,
    };
    dispatch({
      type: "update-block",
      value: { index, content },
    });
    onDeleteModalClose();
  };

  const editColumn = <T extends ContentBlockState>(
    sideUpdates: T["content"],
  ) => {
    const content: Partial<ColumnBlockState["content"]> = {
      [side]: {
        ...block,
        content: {
          ...block?.content,
          ...sideUpdates,
        },
      },
    };
    dispatch({
      type: "update-block",
      value: { index, content },
    });
    onEditModalClose();
  };

  if (editable) {
    if (block === null) {
      return (
        <Droppable droppableId={`${columnID} ${side} COLUMN"`}>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              borderWidth="3px"
              borderColor="grey.200"
              margin="1rem"
              width="100%"
              minHeight="20rem"
            />
          )}
        </Droppable>
      );
    }
    return (
      <Box
        borderWidth="3px"
        borderColor={isHovered ? "grey.200" : "white"}
        margin="1rem"
        width="100%"
      >
        {block && (
          <VStack
            width="100%"
            height="100%"
            padding="0.5rem 1rem"
            spacing={2}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Flex width="100%" alignItems="end" direction="column">
              <EditContentOptionsMenu
                isVisible={isHovered}
                onEditClick={onEditModalOpen}
                onDeleteClick={onDeleteModalOpen}
              />
              <Center w="100%" padding="4px">
                {CONTENT_BLOCKS.render({ block, index, editable })}
              </Center>
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
          </VStack>
        )}
      </Box>
    );
  }
  // If not editable, return just content block
  return (
    <Center w="100%" padding="4px">
      {block && CONTENT_BLOCKS.render({ block, index, editable })}
    </Center>
  );
};

export default ColumnContent;
