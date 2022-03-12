import React, { useContext } from "react";
import { VStack } from "@chakra-ui/react";

import { EditorContext } from "../../contexts/ModuleEditorContext";
import EditableContentBlock from "./EditableContentBlock";

const LessonViewer = (): React.ReactElement => {
  const editorContext = useContext(EditorContext);
  const lessonID = editorContext.focusedLesson;

  if (lessonID) {
    const lesson = editorContext.lessons[lessonID];

    return (
      <VStack flex="1" flexFlow="column" alignItems="center" spacing="8">
        {lesson.content.map((block, index) => (
          <EditableContentBlock content={block} key={index} />
        ))}
      </VStack>
    );
  }

  // TODO: Better lesson fallback
  return <div>No lesson selected :)</div>;
};

export default LessonViewer;
