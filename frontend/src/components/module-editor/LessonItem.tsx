import React, { useState } from "react";
import { Button, IconButton, Flex } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import { ReactComponent as DragHandleIconSvg } from "../../assets/DragHandle.svg";

interface OptionsProps {
  id: string;
  text: string;
  isFocused: boolean;
  setFocus: () => void;
  index: number;
}

/* eslint-disable react/jsx-props-no-spreading */

const LessonItem = ({
  id,
  text,
  isFocused,
  setFocus,
  index,
}: OptionsProps): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
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
          {...provided.draggableProps}
          style={provided.draggableProps.style}
          ref={provided.innerRef}
        >
          <Flex align="center" justify="space-between" pr="8px">
            <Flex align="center">
              <IconButton
                visibility={isHovered ? "visible" : "hidden"}
                aria-label="Drag Lesson"
                variant="unstyled"
                size="xs"
                icon={<DragHandleIconSvg />}
                {...provided.dragHandleProps}
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
      )}
    </Draggable>
  );
};

export default LessonItem;
