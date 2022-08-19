import { Button, useDisclosure, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleEditorParams } from "../../types/ModuleEditorTypes";
import { Modal } from "../common/Modal";
import { TextInput } from "../common/TextInput";

import LessonItem from "./LessonItem";
import { GET_LESSON_PROGRESS } from "../../APIClients/queries/ProgressQueries";
import AuthContext from "../../contexts/AuthContext";

const SideBarModuleOverview = ({
  editable,
  onLessonSelected,
}: {
  editable: boolean;
  onLessonSelected: () => void;
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { authenticatedUser } = useContext(AuthContext);

  const { lessons, course, focusedLesson } = state;
  console.log("FOCUSED LESSON,", focusedLesson);
  const module = course.modules[moduleID];

  const orderedLessons = module.lessons.map((id) => lessons[id]);

  const setFocus = (index: number) =>
    dispatch({ type: "set-focus", value: module.lessons[index] });

  const resetState = () => {
    setTitle("");
    setErrorMessage("");
    setIsInvalid(false);
  };
  console.log(Object.keys(state.lessons));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: lessonProgressData } = useQuery(GET_LESSON_PROGRESS, {
    variables: {
      userId: authenticatedUser?.id,
      lessonIds: Object.keys(state.lessons),
    },
  });

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
      {orderedLessons.map((lesson, index) => (
        <LessonItem
          editable={editable}
          text={lesson.title}
          isFocused={
            focusedLesson !== null && state.lessons[focusedLesson] === lesson
          }
          isComplete={lessonProgressData.lessonProgress.find(lesson.id) !== -1}
          key={lesson.id}
          setFocus={() => {
            onLessonSelected();
            setFocus(index);
          }}
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
