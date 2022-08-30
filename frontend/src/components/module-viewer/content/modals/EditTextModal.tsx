import { Box, Flex, VStack, HStack, Divider } from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import { createEditor, BaseEditor } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import {
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
  RiBold,
  RiItalic,
  RiUnderline,
} from "react-icons/ri";
import { IoLinkOutline } from "react-icons/io5";

import { TextBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import FormatButton from "./FormatButton";
import BlockButton from "./BlockButton";

import {
  EditContentModalProps,
  CustomElement,
  CustomText,
  LeafPropTypes,
  ElementPropTypes,
} from "../../../../types/ModuleEditorTypes";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Leaf = ({ attributes, children, leaf }: LeafPropTypes) => {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? "bold" : "normal",
        fontStyle: leaf.italic ? "italic" : "normal",
        textDecorationLine: leaf.underline ? "underline" : "none",
      }}
    >
      {children}
    </span>
  );
};

const Element = ({ attributes, children, element }: ElementPropTypes) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const initialValue: Array<CustomElement> = [
  {
    type: "paragraph",
    align: "left",
    children: [{ text: "" }],
  },
];

const EditTextModal = ({
  block,
  isOpen,
  onClose,
  onSave,
}: EditContentModalProps<TextBlockState>): React.ReactElement => {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState(block.content.text ?? "");
  const [invalid, setInvalid] = useState(false);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const onConfirm = () => {
    if (!text) {
      setInvalid(true);
    } else {
      onSave({ text });
      setText(text);
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
        <Slate editor={editor} value={initialValue}>
          <VStack flex="1" w="100%">
            <Box borderWidth="1px" w="100%" padding="0.5rem">
              <HStack spacing={2}>
                <BlockButton icon={<RiAlignLeft />} format="left" />
                <BlockButton icon={<RiAlignCenter />} format="center" />
                <BlockButton icon={<RiAlignRight />} format="right" />
                <BlockButton icon={<RiAlignJustify />} format="justify" />
                <Divider orientation="vertical" />
                <FormatButton icon={<RiBold />} format="bold" />
                <FormatButton icon={<RiItalic />} format="italic" />
                <FormatButton icon={<RiUnderline />} format="underline" />
              </HStack>
            </Box>
            <Box borderWidth="1px" w="100%" h="150px" padding="1rem">
              <Editable
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                placeholder="Insert text here"
              />
            </Box>
          </VStack>
        </Slate>
      </Flex>
    </Modal>
  );
};

export default EditTextModal;
