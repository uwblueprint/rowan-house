import React from "react";
import { Button, IconButton, Flex } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ReactComponent as DragHandleIconSvg } from "../../assets/DragHandle.svg";

interface OptionsProps {
    text: string,
    isHovered: {hoveredState: boolean, index: number},
    isFocused: boolean,
    index: number,
    setIsHovered: (stateValue: ({hoveredState: boolean, index: number}) | ((prevVar: ({hoveredState: boolean, index: number})) => {hoveredState: boolean, index: number} )) => void,
    setFocus: (index: number) => void,
}

const LessonOptions = ({ text='', isFocused, isHovered=({hoveredState: false, index: 0}), index, setIsHovered, setFocus }: OptionsProps) => ( 
  <>
    {!isFocused ? (
      <Button
        key={index}
        onClick={() => setFocus(index)}
        variant="unstyled"
        textAlign="left"
        pl="10px"
        minH="55px"
        w="100%"
        onMouseEnter={() => setIsHovered({hoveredState: true, index})}
        onMouseLeave={() => setIsHovered({hoveredState: false, index})}
      >
        <Flex align='center' justify="space-between" pr="8px">
          <Flex align='center'>
            <IconButton visibility={(isHovered.hoveredState && isHovered.index === index) ? 'visible' : 'hidden'} aria-label='Drag Lesson' variant="unstyled" size="xs" icon={<DragHandleIconSvg/>} />
            <p style={{marginLeft: "10px"}}> {text} </p>
          </Flex>
          <Flex align='center' pb='5px'>
            <IconButton visibility={(isHovered.hoveredState && isHovered.index === index) ? 'visible' : 'hidden'} aria-label='Edit Lesson' variant="unstyled" fontSize="18px" size="sm" icon={<EditIcon />} />
            <IconButton visibility={(isHovered.hoveredState && isHovered.index === index) ? 'visible' : 'hidden'} aria-label='Delete Lesson' variant="unstyled" fontSize="18px" size="sm" icon={<DeleteIcon />} />
          </Flex>
        </Flex>
      </Button>
    ) : (
        <Button
          key={index}
          onClick={() => setFocus(index)}
          variant="unstyled"
          borderLeftColor="brand.royal"
          borderLeftWidth="5px"
          borderRadius="0"
          bg="background.light"
          textAlign="left"
          pl="6px"
          minH="55px"
          w="100%"
          onMouseEnter={() => setIsHovered({hoveredState: true, index})}
          onMouseLeave={() => setIsHovered({hoveredState: false, index})}
        >
          <Flex align='center' justify="space-between" pr="8px">
            <Flex align='center'>
              <IconButton visibility={(isHovered.hoveredState && isHovered.index === index) ? 'visible' : 'hidden'} aria-label='Drag Lesson' variant="unstyled" size="xs" icon={<DragHandleIconSvg/>} />
              <p style={{marginLeft: "10px"}}>
                {text} 
              </p>
            </Flex>
            <Flex align='center' pb='5px'>
              <IconButton visibility={(isHovered.hoveredState && isHovered.index === index) ? 'visible' : 'hidden'} aria-label='Edit Lesson' variant="unstyled" fontSize="18px" size="sm" icon={<EditIcon />} />
              <IconButton visibility={(isHovered.hoveredState && isHovered.index === index) ? 'visible' : 'hidden'} aria-label='Delete Lesson' variant="unstyled" fontSize="18px" size="sm" icon={<DeleteIcon />} />
            </Flex>
          </Flex>
        </Button>
    )}
  </>
);

  
export default LessonOptions;
