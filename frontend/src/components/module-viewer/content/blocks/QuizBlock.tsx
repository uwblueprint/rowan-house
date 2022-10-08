import React, { useState, useEffect } from "react";
import { Flex, Text, VStack, Button } from "@chakra-ui/react";
import { ReactComponent as QuizIcon } from "../../../../assets/quiz.svg";

import {
  ContentBlockProps,
  QuizBlockState,
} from "../../../../types/ContentBlockTypes";
import { CheckBoxes } from "../../../common/checkboxes";

const QuizBlock = ({
  block: { content },
}: ContentBlockProps<QuizBlockState>): React.ReactElement => {
  const [guesses, setGuesses] = useState<boolean[]>(
    Array(content.choices.length).fill(false),
  );
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    setGuesses(Array(content.choices.length).fill(false));
    setCompleted(false);
  }, [content.choices]);

  const borderStyling = (i: number) => {
    if (isCompleted) {
      if (content.choices[i].correct) return "1px solid #94D969";
      if (guesses[i] !== content.choices[i].correct) return "1px solid #E53E3E";
    }
    return undefined;
  };

  const backgroundStyling = (i: number) => {
    if (isCompleted) {
      if (content.choices[i].correct) return "#EAF7E1";
      if (guesses[i] !== content.choices[i].correct) return "#FAD8D8";
    }
    return undefined;
  };

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
        <QuizIcon />
        <Text variant="heading">Knowledge Check</Text>
      </Flex>
      <h3>{content.question}</h3>
      <CheckBoxes
        statuses={guesses}
        setStatus={setGuesses}
        multiSelect={content.type === "MS"}
        selectedColor={isCompleted ? "#724A9688" : "#724A96"}
        borderStyling={borderStyling}
        backgroundStyling={backgroundStyling}
        disabled={isCompleted}
      >
        {content.choices.map(({ answer }, i) => (
          <Text key={i}>{answer}</Text>
        ))}
      </CheckBoxes>
      {!isCompleted && (
        <Button
          w="fit-content"
          onClick={() => setCompleted(true)}
          disabled={!guesses.some((g) => g)}
        >
          Check answer
        </Button>
      )}
    </VStack>
  );
};

export default QuizBlock;
