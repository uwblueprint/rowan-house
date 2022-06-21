import { Flex, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ContentBlock } from "../../types/ModuleEditorTypes";
import { Modal } from "../common/Modal";
import EditorContext from "../../contexts/ModuleEditorContext";

import { TextArea } from "../common/TextArea";

export interface EditTextModalProps {
  onClose: () => void;
  isOpen: boolean;
  block: ContentBlock;
  index: number;
}

const EditTextModal = ({
  block,
  index,
  isOpen,
  onClose,
}: EditTextModalProps): React.ReactElement => {
  const [text, setText] = useState(block.content.text ?? "");
  const [invalid, setInvalid] = useState(false);
  const context = useContext(EditorContext);

  if (!context) return <></>;
  const { dispatch } = context;

  const onSave = () => {
    if (!text) {
      setInvalid(true);
      return;
    }
    const newBlock = {
      ...block,
      content: {
        ...block.content,
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
      header="Edit Text Component"
      onConfirm={onSave}
      onCancel={onClose}
      isOpen={isOpen}
    >
      <Flex>
        <VStack flex="1">
          <TextArea
            label="Text Content:"
            defaultValue={text}
            onChange={setText}
            isInvalid={invalid}
            errorMessage="This field is required."
          />
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditTextModal;
