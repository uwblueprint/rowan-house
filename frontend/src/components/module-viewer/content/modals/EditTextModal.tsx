import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { createEditor, BaseEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

import { TextBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";

import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Array<CustomElement> = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const EditTextModal = ({
  block,
  isOpen,
  onClose,
  onSave,
}: EditContentModalProps<TextBlockState>): React.ReactElement => {
  const [editor] = useState(() => withReact(createEditor()));
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
      onCancel={onClose}
      isOpen={isOpen}
    >
      <Flex>
        <VStack flex="1">
          <Box borderWidth="1px" w="100%" padding="1rem">
            <Slate editor={editor} value={initialValue}>
              <Editable />
            </Slate>
          </Box>
          {/* <TextArea
            label="Text Content:"
            defaultValue={text}
            onChange={setText}
            isInvalid={invalid}
            errorMessage="This field is required."
          /> */}
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditTextModal;
