import React from "react";

import {
  ContentBlockProps,
  QuizBlockState,
} from "../../../../types/ContentBlockTypes";

const QuizBlock = ({
  block: { content },
}: ContentBlockProps<QuizBlockState>): React.ReactElement => {
  return (
    <>
      <p>{content.question}</p>
      {content.choices.map(({ answer, correct }) => (
        <p key={answer}>
          {answer}
          {correct}
        </p>
      ))}
    </>
  );
};

export default QuizBlock;
