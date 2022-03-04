import React, { useContext } from "react";
import { VStack } from "@chakra-ui/react";

import { EditorContext } from "../../contexts/ModuleEditorContext";
import EditableContentBlock from "./EditableContentBlock";

const LessonViewer = (): React.ReactElement => {
  const editorContext = useContext(EditorContext);

  return (
    <VStack flex="1" flexFlow="column" alignItems="center" spacing="8">
      {editorContext.lesson.content.map((block, index) => (
        <EditableContentBlock content={block} key={index} />
      ))}
    </VStack>
  );
};

export default LessonViewer;
