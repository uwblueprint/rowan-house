import React from "react";

import { ContentProps } from "../../../types/ModuleEditorTypes";

const TextBlock = ({
  content,
}: {
  content: ContentProps;
}): React.ReactElement => {
  return <p>{content.text}</p>;
};

export default TextBlock;
