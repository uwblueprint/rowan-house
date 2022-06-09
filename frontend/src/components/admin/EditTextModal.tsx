import { Flex, VStack, Image } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import { ContentBlock, ContentTypeEnum, EditorContextAction } from "../../types/ModuleEditorTypes";
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
  const context = useContext(EditorContext);
  const [text, setText] = useState(block.content.text ?? "");

  if (!context) return <></>;
  const { state, dispatch } = context;

  const onSave = () => {
    const newBlock = {
      ...block,
      content: {
        ...block.content,
        text,
      }
    };
    // newBlock.content.text = text;
    dispatch({
      type: "update-block",
      value: {
        index,
        block: newBlock,
      },
    });
    // state.
    onClose();
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal
      size="xl"
      header="Edit Text Component"
      onConfirm={onSave}
      onCancel={onClose}
      isOpen={isOpen}
    >
      <Flex>
        <VStack flex="1">
          <TextArea defaultValue={text} onChange={setText} isRequired />
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditTextModal;
