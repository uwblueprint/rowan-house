import React, { useState } from "react";
import { Box, Button, SimpleGrid, Text, Center, VStack } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { ContentBlockProps, MatchBlockState } from "../../../../types/ContentBlockTypes";

const AnswerStyle = ({text}: {text: string}): React.ReactElement => {
  return (
    <Box
      w="100%"
      padding="1rem"
      border="2px"
      borderColor="#E5E7EB"
      borderRadius="4px"
    >
      <p>{text}</p>
    </Box>
  );
}

const DraggableAnswer = ({id, text, index}: 
  {id: number; text: string, index: number}
): React.ReactElement => {
  return (
    <Draggable
      key={id}
      index={index}
      draggableId={`${id}-ANSWER`}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
        >
          <AnswerStyle text={text}/>
        </div>
      )}
    </Draggable>
  );
};

const DropAreaStyle = (): React.ReactElement => {
  return (
    <Center 
      w="100%"
      padding="1rem"
      border="2px"
      borderColor="#E5E7EB"
      borderStyle="dashed"
      borderRadius="4px"
      bg="#F4F4F4"
    >
      <Text variant="sm" color="#666">Drag & Drop Answer Here</Text>
    </Center>
  );
}

const MatchBlock = ({
  block: { content },
  editable,
}: ContentBlockProps<MatchBlockState>): React.ReactElement => {
  const [pairs, setPairs] = useState(Array(content.matches.length).fill(null));

  const setAnswer = (index: number | string, newVal: null | number | string) => {
    const i = typeof index === 'string' ? parseInt(index, 10) : index;
    const val = typeof newVal === 'string' ? parseInt(newVal, 10) : newVal;
    const newPairs = [...pairs];
    newPairs[i] = val;
    setPairs(newPairs);
  }

  const onDragEnd = ({source, destination, draggableId}: DropResult) => {
    if (destination?.droppableId === "POOL") {
      if (source.droppableId === "POOL") return;
      const [index] = source.droppableId.split("-");
      setAnswer(index, null);
    } else if (destination?.droppableId.includes("DROP")) {
      // TODO: D & D between DROP locations
      const [dropIndex] = destination.droppableId.split("-");
      const [answerIndex] = draggableId.split("-");
      setAnswer(dropIndex, answerIndex);
    } else {
      throw Error(`Invalid destination: ${destination}`);
    }
  }

  if (editable) {
    return (
      <VStack
        w="100%"
        padding="2rem"
        border="1px"
      >
        <h3>Matching</h3>
        <h3>{content.question}</h3>
        <SimpleGrid columns={2} gap={2}>
          {content.matches.map(({prompt}, i) => (
            <>
              <p>{prompt}</p>
              <DropAreaStyle/>
            </>
          ))}
        </SimpleGrid>
        <Box w="100%" padding="1rem">
          {content.matches.map(({answer}, i) => (
            <AnswerStyle key={i} text={answer} />
          ))}
        </Box>
        <Button>Check answer</Button>
      </VStack>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <VStack
        w="80%"
        padding="2rem"
        border="1px"
      >
        <h3>Matching</h3>
        <h3>{content.question}</h3>
        <SimpleGrid columns={2} gap={2} w="100%">
          {content.matches.map(({prompt}, i) => (
            <>
              <Center w="100%">{prompt}</Center>
              <Droppable droppableId={`${i}-DROP`} type="MATCH" isDropDisabled={Boolean(pairs[i])}>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    {pairs[i] !== null ? 
                      <DraggableAnswer
                        id={pairs[i]}
                        key={i}
                        index={i}
                        text={content.matches[pairs[i]].answer}
                      /> : <DropAreaStyle/>}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </>
          ))}
        </SimpleGrid>
        <Droppable droppableId="POOL" type="MATCH">
          {(provided) => (
            <SimpleGrid columns={2} gap={2} w="100%" ref={provided.innerRef}>
              {content.matches.map(({answer}, i) => (
                !pairs.includes(i) && <DraggableAnswer key={i} id={i} text={answer} index={i}/>
              ))}
              {provided.placeholder}
            </SimpleGrid>
          )}
        </Droppable>
        <Button>Check answer</Button>
      </VStack>
    </DragDropContext>
  );
};

export default MatchBlock;
