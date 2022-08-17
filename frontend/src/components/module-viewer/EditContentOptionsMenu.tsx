import React from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { EditIcon, CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { EditContentOptionsMenuProps } from "../../types/ModuleEditorTypes";

const EditContentOptionsMenu = ({
  isVisible,
  onEditClick,
  onCopyClick,
  onDeleteClick,
}: EditContentOptionsMenuProps): React.ReactElement => {
  return (
    <HStack
      spacing={0}
      visibility={isVisible ? "visible" : "hidden"}
      align="start"
    >
      {onEditClick && (
        <IconButton
          aria-label="Edit this content block"
          variant="transparent"
          onClick={onEditClick}
          m={0}
          icon={<EditIcon color="background.dark" h={5} w={5} />}
        />
      )}
      {onCopyClick && (
        <IconButton
          aria-label="Duplicate this content block"
          variant="transparent"
          onClick={onCopyClick}
          m={0}
          icon={<CopyIcon color="background.dark" h={5} w={5} />}
        />
      )}
      {onDeleteClick && (
        <IconButton
          aria-label="Delete this content block from lesson"
          variant="transparent"
          onClick={onDeleteClick}
          m={0}
          icon={<DeleteIcon color="background.dark" h={5} w={5} />}
        />
      )}
    </HStack>
  );
};

export default EditContentOptionsMenu;
