import React, { useContext } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";

import EditorContext from "../../contexts/ModuleEditorContext";
import ContentBlock from "./content/ContentBlock";
import { ContentBlockState } from "../../types/ContentBlockTypes";
import { LessonType } from "../../types/ModuleEditorTypes";

const LessonViewer = ({
  editable,
  onLessonCompleted,
}: {
  editable: boolean;
  onLessonCompleted: (lessonId: string) => void;
}): React.ReactElement => {
  const context = useContext(EditorContext);
  const { state } = context;
  if (!state) return <></>;

  const { focusedLesson } = state;

  function renderLessonViewer(lesson: LessonType, provided?: DroppableProvided): React.ReactElement {
    if (!focusedLesson) return <></>;

    return (
      <Flex
        ref={provided?.innerRef}
        height="100%"
        direction="column"
        flex="1"
      >
        {lesson?.content.map((block: ContentBlockState, index: number) => (
          <ContentBlock
            editable={editable}
            block={block}
            key={index}
            index={index} />
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
        {provided?.placeholder}
      </Flex>
    );
  }

  if (focusedLesson) {
    const lesson = state.lessons[focusedLesson];

    if (editable) {
      return (
        <Droppable droppableId="EDITOR" isDropDisabled={!editable}>
          {(provided) => (
            renderLessonViewer(lesson, provided)
          )}
        </Droppable>
      );
    }
    return renderLessonViewer(lesson);
  }

  // TODO: Better lesson fallback
  return <div>No lesson selected :)</div>;
};

export default LessonViewer;