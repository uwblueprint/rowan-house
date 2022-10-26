import React, { useState, useEffect } from "react";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactComponent as QuizIcon } from "../../../../assets/quiz.svg";

import {
  ContentBlockProps,
  QuizBlockState,
} from "../../../../types/ContentBlockTypes";
import CheckBoxGroup from "../../../common/CheckBoxGroup";

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
      w={["100%", "100%", "80%"]}
      padding={["1rem", "1rem", "2rem"]}
      paddingLeft={["1rem", "2rem", "4rem"]}
      paddingRight={["1rem", "2rem", "4rem"]}
      align="left"
      borderTopColor="brand.royal"
      borderTopWidth="10px"
      borderRadius="8px"
      boxShadow="xl"
    >
      <HStack align="center" spacing={2}>
        <QuizIcon />
        <Text variant="heading">Knowledge Check</Text>
      </HStack>
      <Text variant="subheading">{content.question}</Text>
      <CheckBoxGroup
        statuses={guesses}
        setStatus={setGuesses}
        multiSelect={content.type === "multi-select"}
        selectedColor={isCompleted ? "CBfaded" : "CBroyal"}
        borderStyling={borderStyling}
        backgroundStyling={backgroundStyling}
        disabled={isCompleted}
      >
        {content.choices.map(({ answer }, i) => (
          <Text key={i}>{answer}</Text>
        ))}
      </CheckBoxGroup>
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
