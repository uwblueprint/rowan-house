import React, { useContext, useMemo } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";

import EditorContext from "../../contexts/ModuleEditorContext";
import ContentBlock from "./content/ContentBlock";

const LessonViewer = ({
  editable,
  onLessonCompleted,
}: {
  editable: boolean;
  onLessonCompleted: (lessonId: string) => void;
}): React.ReactElement => {
  const context = useContext(EditorContext);
  if (!context) return <></>;

  const { state } = context;
  const { focusedLesson } = state;

  if (focusedLesson) {
    const lesson = state.lessons[focusedLesson];

    return (
      <Droppable droppableId="EDITOR" isDropDisabled={!editable}>
        {(provided) => (
          <Flex ref={provided.innerRef} direction="column" flex="1">
            {lesson?.content.map((block, index) => (
              <ContentBlock
                editable={editable}
                block={block}
                key={index}
                index={index}
              />
            ))}
            {!editable && (
              <Flex py="22px" justify="center">
                <Button
                  key={focusedLesson}
                  onClick={() => onLessonCompleted(focusedLesson)}
                >
                  Continue
                </Button>
              </Flex>
            )}
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
