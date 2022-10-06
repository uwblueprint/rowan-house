import React, { useState, useEffect } from "react";
import { Flex, Text, VStack, Button } from "@chakra-ui/react";

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
  }, [content.choices]);

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
        <Text variant="heading">Knowledge Check</Text>
      </Flex>
      <h3>{content.question}</h3>
      <CheckBoxes
        statuses={guesses}
        setStatus={setGuesses}
        multiSelect={content.type === "MS"}
      >
        {content.choices.map(({ answer }, i) => (
          <Text key={i}>{answer}</Text>
        ))}
      </CheckBoxes>
      <Button
        w="fit-content"
        onClick={() => setCompleted(true)}
        disabled={!guesses.some((g) => g)}
      >
        Check answer
      </Button>
    </VStack>
  );
};

export default QuizBlock;
