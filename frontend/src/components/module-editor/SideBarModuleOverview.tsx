import { Button, useDisclosure, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleEditorParams } from "../../types/ModuleEditorTypes";
import { Modal } from "../common/Modal";
import { TextInput } from "../common/TextInput";

import LessonItem from "./LessonItem";
import DeleteModal from "../common/DeleteModal";

enum ModalType {
  EDIT = "edit",
  DELETE = "delete",
  CREATE_LESSON = "create-lesson",
}

const SideBarModuleOverview = (): React.ReactElement => {
  const context = useContext(EditorContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalType, setModalType] = useState(ModalType.EDIT); // determines which modal is shown when isOpen is true
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();
  const moduleID = parseInt(moduleIndex, 10);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

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

  const onClick = (type: ModalType) => {
    setModalType(type);
    onOpen();
  };

  const onDeleteClick = (index: number) => {
    onClick(ModalType.DELETE);
    setSelectedLessonIndex(index);
  };

  const createLesson = (lessonTitle: string) => {
    if (title) {
      dispatch({
        type: "create-lesson",
        value: {
          lesson: {
            course: courseID,
            module: course.modules[moduleID].id,
            title: lessonTitle,
            content: [],
          },
          moduleIndex: Number(moduleIndex),
        },
      });
      resetState();
      onClose();
    } else {
      setErrorMessage("Error: title cannot be empty.");
      setIsInvalid(true);
    }
  };

  const deleteLesson = () => {
    dispatch({
      type: "delete-lesson",
      value: {
        lessonId: module.lessons[selectedLessonIndex],
        moduleIndex: Number(moduleIndex),
      },
    });
    onClose();
  };

  return (
    <VStack>
      {orderedLessons.map((lesson, index) => (
        <LessonItem
          text={lesson.title}
          isFocused={!!focusedLesson && state.lessons[focusedLesson] === lesson}
          key={lesson.id}
          id={lesson.id}
          setFocus={() => setFocus(index)}
          onDeleteClick={() => onDeleteClick(index)}
        />
      ))}
      <Button
        onClick={() => onClick(ModalType.CREATE_LESSON)}
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
      {modalType === ModalType.CREATE_LESSON && (
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
      )}
      {modalType === ModalType.DELETE && (
        <DeleteModal
          name="Lesson"
          isOpen={isOpen}
          onConfirm={deleteLesson}
          onCancel={onClose}
        />
      )}
    </VStack>
  );
};

export default SideBarModuleOverview;
