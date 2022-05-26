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
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();
  const moduleID = parseInt(moduleIndex, 10);

  if (!context) return <></>;
  const { state, dispatch } = context;

  const { lessons, course, focusedLesson } = state;
  const module = course.modules[moduleID];

  const orderedLessons = module.lessons.map((id) => lessons[id]);

  const setFocus = (index: number) =>
    dispatch({ type: "set-focus", value: module.lessons[index] });

  

  const createLesson = (lessonTitle: string) => {
    dispatch({
      type: "create-lesson",
      value: {
        course: courseID,
        module: course.modules[moduleID].id,
        title: lessonTitle,
        content: [],
      },
    });

    setTitle("");
    onClose();
  };

  const openCreateLessonModal = () => {
    onOpen();
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
        // onClick={() => createLesson(`Lesson ${orderedLessons.length + 1}`)}
        onClick={() => openCreateLessonModal()}
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
        onCancel={onClose}
      >
        <TextInput placeholder="New Lesson" onChange={setTitle} isRequired />
      </Modal>
    </VStack>
  );
};

export default SideBarModuleOverview;
