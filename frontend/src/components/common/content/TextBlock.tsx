import React from "react";

import { TextBlockState } from "../../../types/ModuleEditorTypes";

const TextBlock = ({
  block: { content },
}: {
  block: TextBlockState;
}): React.ReactElement => {
  return <p>{content.text}</p>;
};

export default TextBlock;
