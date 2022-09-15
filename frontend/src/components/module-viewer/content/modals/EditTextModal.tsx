import { Box, Flex, VStack, HStack, Divider, Link } from "@chakra-ui/react";
import React, { useState, useCallback, useMemo } from "react";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import { createEditor, Transforms, Range } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import isUrl from "is-url";
import {
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
  RiBold,
  RiItalic,
  RiUnderline,
} from "react-icons/ri";

import { TextBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import FormatButton, { toggleFormat } from "./FormatButton";
import AlignmentButton from "./AlignmentButton";
import LinkButton, { wrapLink } from "./LinkButton";

import {
  EditContentModalProps,
  CustomElement,
  TextEditor,
  LeafPropTypes,
  ElementPropTypes,
  FormatEnum,
} from "../../../../types/ModuleEditorTypes";

const HOTKEYS: Record<string, FormatEnum> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
};

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
  switch (element.type) {
    case "link":
      return (
        <Link
          {...attributes}
          style={{ textDecorationLine: "underline" }}
          color="purple"
          isExternal
          href={element.url}
          onClick={() => {
            window.open(element.url, "_blank", "noopener,noreferrer");
          }}
        >
          {children}
        </Link>
      );
    default:
      return (
        <p style={{ textAlign: element.align }} {...attributes}>
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

/* eslint-disable no-param-reassign */
const withInlines = (editor: TextEditor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element: CustomElement) =>
    ["link"].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
/* eslint-enable no-param-reassign */

const EditTextModal = ({
  block,
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<TextBlockState>): React.ReactElement => {
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    [],
  );
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

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { selection } = editor;

    Object.keys(HOTKEYS).forEach((hotkey) => {
      if (isHotkey(hotkey, event as React.KeyboardEvent<HTMLElement>)) {
        event.preventDefault();
        const format = HOTKEYS[hotkey];
        toggleFormat(editor, format);
      }
    });

    if (selection && Range.isCollapsed(selection)) {
      const { nativeEvent } = event;
      if (isKeyHotkey("left", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset", reverse: true });
        return;
      }
      if (isKeyHotkey("right", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset" });
      }
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
        <Slate editor={editor} value={initialValue}>
          <VStack flex="1" w="100%">
            <Box borderWidth="1px" w="100%" padding="0.5rem">
              <HStack spacing={2}>
                <AlignmentButton icon={<RiAlignLeft />} format="left" />
                <AlignmentButton icon={<RiAlignCenter />} format="center" />
                <AlignmentButton icon={<RiAlignRight />} format="right" />
                <AlignmentButton icon={<RiAlignJustify />} format="justify" />
                <Divider orientation="vertical" />
                <FormatButton icon={<RiBold />} format="bold" />
                <FormatButton icon={<RiItalic />} format="italic" />
                <FormatButton icon={<RiUnderline />} format="underline" />
                <Divider orientation="vertical" />
                <LinkButton />
              </HStack>
            </Box>
            <Box borderWidth="1px" w="100%" h="150px" padding="1rem">
              <Editable
                renderLeaf={renderLeaf}
                renderElement={renderElement}
                placeholder="Insert text here"
                onKeyDown={onKeyDown}
              />
            </Box>
          </VStack>
        </Slate>
      </Flex>
    </Modal>
  );
};

export default EditTextModal;
