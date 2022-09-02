import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { TextEditor, FormatEnum } from "../../../../types/ModuleEditorTypes";

const isFormatActive = (editor: TextEditor, format: FormatEnum) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleFormat = (editor: TextEditor, format: FormatEnum): void => {
  const isActive = isFormatActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

type FormatButtonPropsType = {
  icon: JSX.Element;
  format: FormatEnum;
};

const FormatButton = ({
  icon,
  format,
}: FormatButtonPropsType): React.ReactElement => {
  const editor = useSlate();
  return (
    <IconButton
      variant="ghost"
      colorScheme="purple"
      aria-label="align left"
      size="sm"
      icon={icon}
      isActive={isFormatActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    />
  );
};

export default FormatButton;
