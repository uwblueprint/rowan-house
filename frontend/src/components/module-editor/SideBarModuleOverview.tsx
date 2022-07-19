import { Button, useDisclosure, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import EditorContext from "../../contexts/ModuleEditorContext";
import {
  EditorContextAction,
  ModuleEditorParams,
} from "../../types/ModuleEditorTypes";
import { Modal } from "../common/Modal";
import { TextInput } from "../common/TextInput";

import LessonItem from "./LessonItem";

// Copy drag implementation based on https://github.com/atlassian/react-beautiful-dnd/issues/216#issuecomment-423708497
const onDragEnd = (
  dispatch: React.Dispatch<EditorContextAction>,
  result: DropResult,
  moduleID: number,
) => {
  const { source, destination } = result;
  // dropped outside the list
  if (
    source?.droppableId !== "LESSON_EDITOR" ||
    destination?.droppableId !== "LESSON_EDITOR"
  ) {
    return;
  }
  dispatch({
    type: "reorder-lessons",
    value: {
      moduleID,
      oldIndex: source.index,
      newIndex: destination.index,
    },
  });
};

const SideBarModuleOverview = (): React.ReactElement => {
  const context = useContext(EditorContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();
  const moduleID = parseInt(moduleIndex, 10);

  if (!context) return <></>;
  const { state, dispatch } = context;

  const { lessons, course, focusedLesson } = state;
  const module = course.modules[moduleID];

  const setFocus = (index: number) =>
    dispatch({ type: "set-focus", value: module.lessons[index] });

  const resetState = () => {
    setTitle("");
    setErrorMessage("");
    setIsInvalid(false);
  };

  const createLesson = (lessonTitle: string) => {
    if (title) {
      dispatch({
        type: "create-lesson",
        value: {
          course: courseID,
          module: course.modules[moduleID].id,
          title: lessonTitle,
          content: [],
        },
      });
      resetState();
      onClose();
    } else {
      setErrorMessage("Error: title cannot be empty.");
      setIsInvalid(true);
    }
  };

  return (
    <VStack>
      {focusedLesson && (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(dispatch, result, moduleID)}
        >
          <Droppable droppableId="LESSON_EDITOR">
            {(provided) => (
              <VStack w="100%" ref={provided.innerRef}>
                {module.lessons.map((id, index) => (
                  <LessonItem
                    id={id}
                    text={lessons[id].title}
                    isFocused={state.lessons[focusedLesson] === lessons[id]}
                    key={id}
                    setFocus={() => setFocus(index)}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Button
        onClick={onOpen}
        color="brand.royal"
        variant="unstyled"
        leftIcon={<AddIcon />}
        textAlign="left"
        pl="35px"
        minH="55px"
        w="100%"
      >
        New Lesson
      </Button>
      <Modal
        header="Edit lesson title"
        isOpen={isOpen}
        onConfirm={() => createLesson(title)}
        onCancel={() => {
          resetState();
          onClose();
        }}
      >
        <TextInput
          placeholder="New Lesson"
          onChange={(currTitle) => {
            setTitle(currTitle);
            setIsInvalid(false);
          }}
          errorMessage={errorMessage}
          isInvalid={isInvalid}
          isRequired
        />
      </Modal>
    </VStack>
  );
};

export default SideBarModuleOverview;
