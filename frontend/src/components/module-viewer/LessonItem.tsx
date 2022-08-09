import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, IconButton, Flex, useDisclosure } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, LockIcon } from "@chakra-ui/icons";
import { ReactComponent as DragHandleIconSvg } from "../../assets/DragHandle.svg";
import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleEditorParams } from "../../types/ModuleEditorTypes";

interface OptionsProps {
  editable: boolean;
  text: string;
  isFocused: boolean;
  setFocus: () => void;
  onDeleteClick: () => void;
}

const LessonItem = ({
  editable,
  text = "",
  isFocused,
  setFocus,
  onDeleteClick,
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
    setTitle(text);
    setErrorMessage("");
    setIsInvalid(false);
  };

  const updateLessonName = (lessonTitle: string) => {
    if (title) {
      dispatch({
        type: "update-lesson",
        value: {
          title: lessonTitle,
        },
      });
      resetState();
      onClose();
    } else {
      setErrorMessage("Error: Title cannot be empty.");
      setIsInvalid(true);
    }
  };
  const showEditButtons = isHovered && editable;

  const progressIcon = <LockIcon />;

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
              visibility={!editable || isHovered ? "visible" : "hidden"}
              aria-label="Drag Lesson"
              variant="unstyled"
              size="xs"
              icon={editable ? <DragHandleIconSvg /> : progressIcon}
            />
            <p style={{ marginLeft: "10px" }}>{text}</p>
          </Flex>
          <Flex align="center" pb="5px">
            <IconButton
              visibility={showEditButtons ? "visible" : "hidden"}
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
                defaultValue={text}
              />
            </Modal>

            <IconButton
              visibility={showEditButtons ? "visible" : "hidden"}
              aria-label="Delete Lesson"
              variant="unstyled"
              fontSize="18px"
              size="sm"
              onClick={onDeleteClick}
              icon={<DeleteIcon />}
            />
          </Flex>
        </Flex>
      </Button>
    </>
  );
};

export default LessonItem;
