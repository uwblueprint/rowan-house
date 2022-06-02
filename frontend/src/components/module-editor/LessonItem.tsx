import React, { useState } from "react";
import { Button, IconButton, Flex } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ReactComponent as DragHandleIconSvg } from "../../assets/DragHandle.svg";

interface OptionsProps {
  text: string;
  isFocused: boolean;
  setFocus: () => void;
}

const LessonItem = ({
  text = "",
  isFocused,
  setFocus,
}: OptionsProps): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Button
        as="div"
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
              visibility={isHovered ? "visible" : "hidden"}
              aria-label="Drag Lesson"
              variant="unstyled"
              size="xs"
              icon={<DragHandleIconSvg />}
            />
            <p style={{ marginLeft: "10px" }}>{text}</p>
          </Flex>
          <Flex align="center" pb="5px">
            <IconButton
              visibility={isHovered ? "visible" : "hidden"}
              aria-label="Edit Lesson"
              variant="unstyled"
              fontSize="18px"
              size="sm"
              icon={<EditIcon />}
            />
            <IconButton
              visibility={isHovered ? "visible" : "hidden"}
              aria-label="Delete Lesson"
              variant="unstyled"
              fontSize="18px"
              size="sm"
              icon={<DeleteIcon />}
            />
          </Flex>
        </Flex>
      </Button>
    </>
  );
};

export default LessonItem;
