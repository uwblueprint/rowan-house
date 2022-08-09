import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ButtonBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import EditorContext from "../../../../contexts/ModuleEditorContext";
import { TextInput } from "../../../common/TextInput";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

const EditButtonModal = ({
  block,
  index,
  isOpen,
  onClose,
}: EditContentModalProps<ButtonBlockState>): React.ReactElement => {
  const [link, setLink] = useState(block.content.link ?? "");
  const [text, setText] = useState(block.content.text ?? "");
  const context = useContext(EditorContext);

  if (!context) return <></>;
  const { dispatch } = context;

  const onSave = () => {
    if (link === "" || text === "") {
      return;
    }
    const newBlock = {
      ...block,
      content: {
        ...block.content,
        link,
        text,
      },
    };

    dispatch({
      type: "update-block",
      value: {
        index,
        block: newBlock,
      },
    });

    onClose();
  };

  return (
    <Modal
      size="xl"
      header="Edit button component"
      onConfirm={onSave}
      onCancel={onClose}
      isOpen={isOpen}
      canSubmit={link !== "" && text !== ""}
    >
      <VStack alignItems="left">
        <TextInput
          label="Display Text"
          defaultValue={text}
          onChange={setText}
          isInvalid={text === ""}
        />
        <TextInput
          label="Link"
          defaultValue={link}
          onChange={setLink}
          isInvalid={link === ""}
        />
        <Text variant="sm">Preview</Text>
        <Box>
          <a href={link} target="_blank" rel="noreferrer"><Button>{text.length ? text : "Text"}</Button></a>
        </Box>
      </VStack>
    </Modal>
  );
};

export default EditButtonModal;
