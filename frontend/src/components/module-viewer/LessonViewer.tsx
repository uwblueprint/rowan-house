import React, { useContext } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_LESSON_PROGRESS } from "../../APIClients/queries/ProgressQueries";

import EditorContext from "../../contexts/ModuleEditorContext";
import AuthContext from "../../contexts/AuthContext";
import ContentBlock from "./content/ContentBlock";
import { LessonType } from "../../types/ModuleEditorTypes";

const LessonViewer = ({
  editable,
  onLessonCompleted,
}: {
  editable: boolean;
  onLessonCompleted: (lessonId: string) => void;
}): React.ReactElement => {
  const context = useContext(EditorContext);
  const { authenticatedUser } = useContext(AuthContext);
  if (!context) return <></>;

  const { state } = context;
  const { focusedLesson } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: lessonProgressData } = useQuery(GET_LESSON_PROGRESS, {
    variables: {
      userId: authenticatedUser?.id,
      lessonIds: Object.keys(state.lessons),
    },
  });

  if (focusedLesson) {
    const lesson = state.lessons[focusedLesson];

    return (
      <Droppable droppableId="EDITOR" isDropDisabled={!editable}>
        {(provided) => (
          <Flex
            ref={provided.innerRef}
            height="100%"
            direction="column"
            flex="1"
          >
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
