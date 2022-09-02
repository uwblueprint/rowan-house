import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";
import {
  TextEditor,
  BlockFormatEnum,
} from "../../../../types/ModuleEditorTypes";

const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const isBlockActive = (editor: TextEditor, format: BlockFormatEnum) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === "paragraph" &&
        n.align === format,
    }),
  );

  return !!match;
};

const toggleBlock = (editor: TextEditor, format: BlockFormatEnum) => {
  const isActive = isBlockActive(editor, format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  Transforms.setNodes<SlateElement>(editor, {
    align: isActive ? undefined : format,
  });
};

type BlockButtonPropsType = {
  icon: JSX.Element;
  format: BlockFormatEnum;
};

const BlockButton = ({
  icon,
  format,
}: BlockButtonPropsType): React.ReactElement => {
  const editor = useSlate();
  return (
    <IconButton
      variant="ghost"
      colorScheme="purple"
      aria-label={format}
      size="sm"
      icon={icon}
      isActive={isBlockActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    />
  );
};

export default BlockButton;
