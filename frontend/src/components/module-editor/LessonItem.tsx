import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, IconButton, Flex, useDisclosure } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ReactComponent as DragHandleIconSvg } from "../../assets/DragHandle.svg";
import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleEditorParams } from "../../types/ModuleEditorTypes";

interface OptionsProps {
  text: string;
  isFocused: boolean;
  setFocus: () => void;
}

const LessonItem = ({
  text = "",
  isFocused,
  setFocus,
}: OptionsProps): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(text);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();
  const moduleID = parseInt(moduleIndex, 10);

  const context = useContext(EditorContext);
  if (!context) return <></>;
  const { state, dispatch } = context;

  const { course } = state;

  const resetState = () => {
    setTitle("");
    setErrorMessage("");
    setIsInvalid(false);
  };

  const updateLessonName = (lessonTitle: string) => {
    if (title) {
      dispatch({
        type: "update-lesson",
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
      setErrorMessage("Error: Title cannot be empty.");
      setIsInvalid(true);
    }
  };

  return (
    <>
      <Button
        as="div"
        role="button"
        display="inline-flex"
        alignItems="space-between"
        justifyContent="center"
        flexDirection="column"
        tabIndex={0}
        onClick={setFocus}
        variant="unstyled"
        borderLeftColor={isFocused ? "brand.royal" : undefined}
        borderLeftWidth={isFocused ? "5px" : undefined}
        borderRadius={isFocused ? "0" : undefined}
        bg={isFocused ? "background.light" : undefined}
        textAlign="left"
        pl={isFocused ? "6px" : "10px"}
        minH="55px"
        w="100%"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Flex align="center" justify="space-between" pr="8px">
          <Flex align="center">
            <IconButton
              visibility={isHovered ? "visible" : "hidden"}
              aria-label="Drag Lesson"
              variant="unstyled"
              size="xs"
              icon={<DragHandleIconSvg />}
            />
            <p style={{ marginLeft: "10px" }}>{text}</p>
          </Flex>
          <Flex align="center" pb="5px">
            <IconButton
              visibility={isHovered ? "visible" : "hidden"}
              aria-label="Edit Lesson"
              variant="unstyled"
              fontSize="18px"
              size="sm"
              icon={<EditIcon />}
              onClick={onOpen}
            />

            <Modal
              header="Edit lesson title"
              isOpen={isOpen}
              onConfirm={() => updateLessonName(title)}
              onCancel={() => {
                resetState();
                onClose();
              }}
            >
              <TextInput
                placeholder="New lesson name"
                onChange={(currTitle) => {
                  setTitle(currTitle);
                  setIsInvalid(false);
                }}
                errorMessage={errorMessage}
                isInvalid={isInvalid}
              />
            </Modal>

            <IconButton
              visibility={isHovered ? "visible" : "hidden"}
              aria-label="Delete Lesson"
              variant="unstyled"
              fontSize="18px"
              size="sm"
              icon={<DeleteIcon />}
            />
          </Flex>
        </Flex>
      </Button>
    </>
  );
};

export default LessonItem;
