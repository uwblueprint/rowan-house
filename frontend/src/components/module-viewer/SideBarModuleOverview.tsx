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

const SideBarModuleOverview = ({
  editable,
  onLessonSelected,
}: {
  editable: boolean;
  onLessonSelected: () => void;
}): React.ReactElement => {
  const context = useContext(EditorContext);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const [title, setTitle] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();
  const moduleID = parseInt(moduleIndex, 10);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  const { state, dispatch } = context;
  if (!state) return <></>;

  const { lessons, course, focusedLesson, completedLessons } = state;
  const module = course.modules[moduleID];
  const setFocus = (index: number) =>
    dispatch({ type: "set-focus", value: module.lessons[index] });

  const orderedLessons = module.lessons.map((id) => lessons[id]);

  const resetState = () => {
    setTitle("");
    setErrorMessage("");
    setIsInvalid(false);
  };

  const onClick = (type: string) => {
    if (type === "delete") {
      onDeleteOpen();
    } else if (type === "create") {
      onCreateOpen();
    }
  };

  const onDeleteClick = (index: number) => {
    onClick("delete");
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
      onCreateClose();
    } else {
      setErrorMessage("Error: Title cannot be empty.");
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
    onDeleteClose();
  };

  return (
    <VStack pt={editable ? "0px" : "30px"}>
      {orderedLessons.map((lesson, index) => (
        <LessonItem
          editable={editable}
          text={lesson.title}
          isCompleted={
            !!completedLessons.size &&
            completedLessons.has(module.lessons[index])
          }
          isCurrent={index === completedLessons.size}
          isFocused={!!focusedLesson && state.lessons[focusedLesson] === lesson}
          key={module.lessons[index]}
          setFocus={() => {
            onLessonSelected();
            setFocus(index);
          }}
          onDeleteClick={() => onDeleteClick(index)}
        />
      ))}
      {editable && (
        <>
          <Button
            onClick={() => onClick("create")}
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
            isOpen={isCreateOpen}
            onConfirm={() => createLesson(title)}
            onCancel={() => {
              resetState();
              onCreateClose();
            }}
          >
            <TextInput
              placeholder="New lesson"
              isInvalid={isInvalid}
              errorMessage={errorMessage}
              onChange={(currTitle) => {
                setTitle(currTitle);
                setIsInvalid(false);
              }}
            />
          </Modal>

          <DeleteModal
            name="lesson"
            isOpen={isDeleteOpen}
            onConfirm={deleteLesson}
            onCancel={onDeleteClose}
          />
        </>
      )}
    </VStack>
  );
};

export default SideBarModuleOverview;
