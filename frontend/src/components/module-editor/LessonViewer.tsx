import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";

import EditorContext from "../../contexts/ModuleEditorContext";
import EditableContentBlock from "./content/EditableContentBlock";

const LessonViewer = (): React.ReactElement => {
  const context = useContext(EditorContext);
  if (!context) return <></>;

  const { state } = context;
  const { focusedLesson } = state;

  if (focusedLesson) {
    const lesson = state.lessons[focusedLesson];

    return (
      <Droppable droppableId="EDITOR">
        {(provided) => (
          <Flex ref={provided.innerRef} direction="column" flex="1">
            {lesson?.content.map((block, index) => (
              <EditableContentBlock block={block} key={index} index={index} />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    );
  }

  // TODO: Better lesson fallback
  return <div>No lesson selected :)</div>;
};

export default LessonViewer;
