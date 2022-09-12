import { Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { TextBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";

import { TextArea } from "../../../common/TextArea";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

const EditTextModal = ({
  block,
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<TextBlockState>): React.ReactElement => {
  const [text, setText] = useState(block.content.text ?? "");
  const [invalid, setInvalid] = useState(false);

  const onConfirm = () => {
    if (!text) {
      setInvalid(true);
    } else {
      onSave({ text });
    }
  };

  return (
    <Modal
      size="xl"
      header="Edit Text Component"
      onConfirm={onConfirm}
      onCancel={onCancel}
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
