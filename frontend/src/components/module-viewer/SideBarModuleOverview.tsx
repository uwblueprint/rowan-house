import { Button, useDisclosure, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleEditorParams } from "../../types/ModuleEditorTypes";
import { Modal } from "../common/Modal";
import { TextInput } from "../common/TextInput";

import LessonItem from "./LessonItem";

const SideBarModuleOverview = ({
  editable,
}: {
  editable: boolean;
}): React.ReactElement => {
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
    <VStack pt={editable ? "0px" : "30px"}>
      {focusedLesson &&
        orderedLessons.map((lesson, index) => (
          <LessonItem
            editable={editable}
            text={lesson.title}
            isFocused={state.lessons[focusedLesson] === lesson}
            key={lesson.id}
            setFocus={() => setFocus(index)}
          />
        ))}
      {editable && (
        <>
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
        </>
      )}
    </VStack>
  );
};

export default SideBarModuleOverview;
