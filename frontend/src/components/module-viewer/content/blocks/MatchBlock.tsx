import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Circle,
} from "@chakra-ui/react";
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";

import {
  ContentBlockProps,
  MatchBlockState,
} from "../../../../types/ContentBlockTypes";
import { ReactComponent as MatchIcon } from "../../../../assets/match.svg";

enum AnswerStatus {
  Default = "background.lightgrey",
  Incorrect = "text.critical",
  Correct = "text.correct",
}

const AnswerStyle = ({
  text,
  status,
}: {
  text: string;
  status: AnswerStatus;
}): React.ReactElement => {
  return (
    <Box
      w="100%"
      padding="1rem"
      background="white"
      border="2px"
      borderColor={status}
      borderRadius="4px"
    >
      <p>{text}</p>
    </Box>
  );
};

const DraggableAnswer = ({
  id,
  text,
  index,
  status,
  isDropDisabled,
}: {
  id: number;
  text: string;
  index: number;
  status: AnswerStatus;
  isDropDisabled?: boolean;
}): React.ReactElement => {
  return (
    <Draggable
      key={id}
      index={index}
      draggableId={`${id}-ANSWER`}
      isDragDisabled={isDropDisabled || status !== AnswerStatus.Default}
    >
      {(provided) => (
        <Box
          w="100%"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <AnswerStyle text={text} status={status} />
        </Box>
      )}
    </Draggable>
  );
};

const DropAreaStyle = ({
  children,
}: {
  children?: React.ReactElement;
}): React.ReactElement => {
  return (
    <SimpleGrid
      w="100%"
      border="2px"
      borderColor="#E5E7EB"
      borderStyle="dashed"
      borderRadius="4px"
      bg="#F4F4F4"
      columns={1}
    >
      <Box w="100%" gridColumnStart={1} gridRowStart={1} zIndex={2}>
        {children}
      </Box>
      <Text
        padding="1rem"
        variant="sm"
        color="#666"
        gridColumnStart={1}
        gridRowStart={1}
      >
        Drag & Drop Answer Here
      </Text>
    </SimpleGrid>
  );
};

const MatchBlock = ({
  block: { content },
  editable,
}: ContentBlockProps<MatchBlockState>): React.ReactElement => {
  const [answers, setAnswers] = useState(content.matches.map((x) => x.answer));
  const [pairs, setPairs] = useState(Array(content.matches.length).fill(null));
  const [isCompleted, setCompleted] = useState(false);

  // Randomize the order of the answers on load
  useEffect(() => {
    setAnswers(answers.sort(() => Math.random() - 0.5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAnswer = (...args: [number | string, number | string | null][]) => {
    const newPairs = [...pairs];
    args.forEach(([index, newVal]) => {
      const i = typeof index === "string" ? parseInt(index, 10) : index;
      const val = typeof newVal === "string" ? parseInt(newVal, 10) : newVal;
      newPairs[i] = val;
    });
    setPairs(newPairs);
  };

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (destination?.droppableId === "POOL") {
      if (source.droppableId === "POOL") return;
      const [index] = source.droppableId.split("-");
      setAnswer([index, null]);
    } else if (destination?.droppableId.includes("DROP")) {
      const [dropIndex] = destination.droppableId.split("-");
      const [answerIndex] = draggableId.split("-");
      // D & D between DROP locations
      if (source.droppableId.includes("DROP")) {
        const [sourceIndex] = source.droppableId.split("-");
        setAnswer([sourceIndex, null], [dropIndex, answerIndex]);
      } else {
        setAnswer([dropIndex, answerIndex]);
      }
    }
  };

  const renderMatchBlock = () => {
    return (
      <VStack
        w="80%"
        padding="2rem"
        paddingLeft="4rem"
        paddingRight="4rem"
        align="left"
        borderTopColor="brand.royal"
        borderTopWidth="10px"
        borderRadius="8px"
        boxShadow="xl"
      >
        <Flex align="center">
          <MatchIcon />
          <Text variant="heading">Matching</Text>
        </Flex>
        <Text variant="subheading">{content.question}</Text>
        <SimpleGrid
          templateColumns={`1fr 50% ${isCompleted ? "30px" : ""}`}
          alignItems="center"
          gap={2}
          w="100%"
        >
          {content.matches.map(({ prompt, answer }, i) => {
            let status = AnswerStatus.Default;
            if (isCompleted) {
              status =
                answers[pairs[i]] === answer
                  ? AnswerStatus.Correct
                  : AnswerStatus.Incorrect;
            }
            return (
              <>
                <p>{prompt}</p>
                <Droppable
                  droppableId={`${i}-DROP`}
                  type="MATCH"
                  isDropDisabled={pairs[i] !== null}
                >
                  {(provided) => (
                    <div ref={provided.innerRef}>
                      <DropAreaStyle>
                        {pairs[i] !== null ? (
                          <DraggableAnswer
                            id={pairs[i]}
                            key={i}
                            index={i}
                            text={answers[pairs[i]]}
                            status={status}
                          />
                        ) : undefined}
                      </DropAreaStyle>
                    </div>
                  )}
                </Droppable>
                {isCompleted &&
                  (status === AnswerStatus.Correct ? (
                    <CheckCircleIcon color="text.correct" />
                  ) : (
                    <Circle size="fit-content" bg="text.critical" color="white">
                      <SmallCloseIcon />
                    </Circle>
                  ))}
                {isCompleted && (
                  <>
                    <div />
                    <Text
                      marginBottom=".5rem"
                      gridColumn="span 2"
                      color={
                        status === AnswerStatus.Correct ? "green.600" : status
                      }
                    >{`Correct Answer: ${answer}`}</Text>
                  </>
                )}
              </>
            );
          })}
        </SimpleGrid>
        <Droppable droppableId="POOL" type="MATCH">
          {(provided) => (
            <SimpleGrid
              columns={2}
              gap={2}
              w="100%"
              minH="2rem"
              ref={provided.innerRef}
            >
              {answers.map(
                (answer, i) =>
                  !pairs.includes(i) && (
                    <DraggableAnswer
                      key={i}
                      id={i}
                      index={i}
                      text={answer}
                      status={AnswerStatus.Default}
                      isDropDisabled={editable}
                    />
                  ),
              )}
              {provided.placeholder}
            </SimpleGrid>
          )}
        </Droppable>
        <Button
          w="fit-content"
          onClick={() => setCompleted(true)}
          disabled={pairs.some((x) => x === null)}
        >
          Check answer
        </Button>
      </VStack>
    );
  };

  if (editable) {
    return renderMatchBlock();
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {renderMatchBlock()}
    </DragDropContext>
  );
};

export default MatchBlock;
