import React, { useState, useContext } from "react";
import {
  Button,
  IconButton,
  Flex,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  LockIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { ReactComponent as UncheckedCheckbox } from "../../assets/uncheckedcheckbox.svg";
import { ReactComponent as DragHandleIconSvg } from "../../assets/DragHandle.svg";
import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import EditorContext from "../../contexts/ModuleEditorContext";

interface OptionsProps {
  editable: boolean;
  text: string;
  isFocused: boolean;
  isCurrent: boolean;
  isCompleted?: boolean;
  setFocus: () => void;
  onDeleteClick: () => void;
}

const LessonItem = ({
  editable,
  text = "",
  isFocused,
  isCurrent,
  setFocus,
  onDeleteClick,
  isCompleted = false,
}: OptionsProps): React.ReactElement => {
  const [isHovered, setIsHovered] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(text);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const context = useContext(EditorContext);
  if (!context) return <></>;
  const { dispatch } = context;

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

  const locked = !editable && !isCurrent && !isCompleted;

  const getIcon = (): React.ReactElement => {
    if (editable) {
      return <DragHandleIconSvg />;
    }
    if (isCurrent) {
      return <UncheckedCheckbox />;
    }
    if (isCompleted) {
      return <CheckCircleIcon />;
    }
    return <LockIcon />;
  };

  return (
    <Tooltip
      hasArrow
      label={
        locked ? "Complete the previous lesson to unlock the next lesson" : ""
      }
      placement="right-end"
    >
      <Button
        as="div"
        role="button"
        display="inline-flex"
        alignItems="space-between"
        justifyContent="center"
        flexDirection="column"
        tabIndex={0}
        disabled={locked}
        onClick={() => {
          if (locked) {
            return;
          }
          setFocus();
        }}
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
              icon={getIcon()}
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
    </Tooltip>
  );
};

export default LessonItem;
