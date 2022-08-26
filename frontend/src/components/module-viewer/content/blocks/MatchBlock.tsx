import React from "react";

import {
  ContentBlockProps,
  MatchBlockState,
} from "../../../../types/ContentBlockTypes";

const MatchBlock = ({
  block: { content },
  // editable,
}: ContentBlockProps<MatchBlockState>): React.ReactElement => {
  return (
    <>
      <p>{content.question}</p>
      {content.matches.map(({prompt, answer}, i) => <p key={i}>{prompt}: {answer}<br/></p>)}
    </>
  );
};

export default MatchBlock;
