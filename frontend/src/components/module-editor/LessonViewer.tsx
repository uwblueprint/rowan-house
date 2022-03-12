import React, { useContext } from "react";
import { VStack } from "@chakra-ui/react";

import EditorContext from "../../contexts/ModuleEditorContext";
import EditableContentBlock from "./EditableContentBlock";

const LessonViewer = (): React.ReactElement => {
  const context = useContext(EditorContext);
  if (!context) return <></>;

  const { state } = context;
  const { focusedLesson } = state;

  if (focusedLesson) {
    const lesson = state.lessons[focusedLesson];

    return (
      <VStack flex="1" flexFlow="column" alignItems="center" spacing="8">
        {lesson?.content.map((block, index) => (
          <EditableContentBlock content={block} key={index} />
        ))}
      </VStack>
    );
  }

  // TODO: Better lesson fallback
  return <div>No lesson selected :)</div>;
};

export default LessonViewer;
