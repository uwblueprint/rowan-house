import React from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";

import {
  ContentBlockProps,
  QuizBlockState,
} from "../../../../types/ContentBlockTypes";

const QuizBlock = ({
  block: { content },
}: ContentBlockProps<QuizBlockState>): React.ReactElement => {
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
      <p>{content.question}</p>
      {content.choices.map(({ answer, correct }) => (
        <p key={answer}>
          {answer}
          {correct}
        </p>
      ))}
    </VStack>
  );
};

export default QuizBlock;
