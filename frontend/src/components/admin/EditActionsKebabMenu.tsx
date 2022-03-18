import React from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { EditActionsKebabMenuProps } from "../../types/ComponentTypes";
import { ReactComponent as HorizontalIconSvg } from "../../assets/HorizontalKebabMenuIcon.svg";
import { ReactComponent as VerticalIconSvg } from "../../assets/VerticalKebabMenuIcon.svg";

const getMenuIcon = (showHorizontal: boolean) =>
  showHorizontal ? <HorizontalIconSvg /> : <VerticalIconSvg />;

const EditActionsKebabMenu = ({
  handleEditDetailsClick,
  deleteFunction,
  showHorizontal,
}: EditActionsKebabMenuProps): React.ReactElement => {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Edit Options"
        icon={getMenuIcon(showHorizontal)}
        variant={showHorizontal ? "outline" : "transparent"}
      />
      <MenuList>
        <MenuItem
          icon={<EditIcon height={4} width={4} />}
          onClick={handleEditDetailsClick}
        >
          Edit Details
        </MenuItem>
        <MenuItem
          icon={<DeleteIcon height={4} width={4} />}
          onClick={deleteFunction}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default EditActionsKebabMenu;
