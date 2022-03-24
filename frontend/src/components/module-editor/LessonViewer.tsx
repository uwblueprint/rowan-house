import React, { useContext } from "react";
import { VStack } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";

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
      <Droppable droppableId='EDITOR'>
        {(provided, _snapshot) => (
          <VStack ref={provided.innerRef} flex="1" alignItems="center" spacing="8">
            {lesson?.content.map((block, index) => (
              <EditableContentBlock block={block} key={index} index={index} />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    );
  }

  // TODO: Better lesson fallback
  return <div>No lesson selected :)</div>;
};

export default LessonViewer;
