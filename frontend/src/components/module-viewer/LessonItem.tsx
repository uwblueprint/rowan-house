import React, { useState } from "react";
import { Button, IconButton, Flex } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, LockIcon } from "@chakra-ui/icons";
import { ReactComponent as DragHandleIconSvg } from "../../assets/DragHandle.svg";

interface OptionsProps {
  editable: boolean;
  text: string;
  isFocused: boolean;
  setFocus: () => void;
  onDeleteClick: () => void;
}

const LessonItem = ({
  editable,
  text = "",
  isFocused,
  setFocus,
  onDeleteClick,
}: OptionsProps): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);

  const showEditButtons = isHovered && editable;

  const progressIcon = <LockIcon />;

  return (
    <>
      <Button
        as="div"
        role="button"
        display="inline-flex"
        alignItems="space-between"
        justifyContent="center"
        flexDirection="column"
        tabIndex={0}
        onClick={setFocus}
        variant="unstyled"
        borderLeftColor={isFocused ? "brand.royal" : undefined}
        borderLeftWidth={isFocused ? "5px" : undefined}
        borderRadius={isFocused ? "0" : undefined}
        bg={isFocused ? "background.light" : undefined}
        textAlign="left"
        pl={isFocused ? "6px" : "10px"}
        minH="55px"
        w="100%"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Flex align="center" justify="space-between" pr="8px">
          <Flex align="center">
            <IconButton
              visibility={!editable || isHovered ? "visible" : "hidden"}
              aria-label="Drag Lesson"
              variant="unstyled"
              size="xs"
              icon={editable ? <DragHandleIconSvg /> : progressIcon}
            />
            <p style={{ marginLeft: "10px" }}>{text}</p>
          </Flex>
          <Flex align="center" pb="5px">
            <IconButton
              visibility={showEditButtons ? "visible" : "hidden"}
              aria-label="Edit Lesson"
              variant="unstyled"
              fontSize="18px"
              size="sm"
              icon={<EditIcon />}
            />
            <IconButton
              visibility={showEditButtons ? "visible" : "hidden"}
              aria-label="Delete Lesson"
              variant="unstyled"
              fontSize="18px"
              size="sm"
              onClick={onDeleteClick}
              icon={<DeleteIcon />}
            />
          </Flex>
        </Flex>
      </Button>
    </>
  );
};

export default LessonItem;
