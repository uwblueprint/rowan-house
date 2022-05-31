import { Button, useDisclosure, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleEditorParams } from "../../types/ModuleEditorTypes";
import { Modal } from "../common/Modal";
import { TextInput } from "../common/TextInput";

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

  const orderedLessons = module.lessons.map((id) => lessons[id]);

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
      {focusedLesson &&
        orderedLessons.map((lesson, index) =>
          state.lessons[focusedLesson] === lesson ? (
            lesson && (
              <Button
                key={index}
                onClick={() => setFocus(index)}
                variant="unstyled"
                borderLeftColor="brand.royal"
                borderLeftWidth="5px"
                borderRadius="0"
                bg="background.light"
                textAlign="left"
                pl="30px"
                minH="55px"
                w="100%"
              >
                {lesson.title}
              </Button>
            )
          ) : (
            <Button
              key={index}
              onClick={() => setFocus(index)}
              variant="unstyled"
              textAlign="left"
              pl="35px"
              minH="55px"
              w="100%"
            >
              {lesson.title}
            </Button>
          ),
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
