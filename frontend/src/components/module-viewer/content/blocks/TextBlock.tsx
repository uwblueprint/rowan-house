import React from "react";
import { createEditor } from "slate";
import {
  Editable,
  Slate,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react";
import { Box, Link } from "@chakra-ui/react";

import {
  ContentBlockProps,
  TextBlockState,
} from "../../../../types/ContentBlockTypes";
import { SlateElement } from "../../../../types/ModuleEditorTypes";

export const TextLeaf = ({
  attributes,
  children,
  leaf,
}: RenderLeafProps): React.ReactElement => {
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

export const TextElement = ({
  attributes,
  children,
  element,
}: RenderElementProps): React.ReactElement => {
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

const initialValue: Array<SlateElement> = [
  {
    type: "paragraph",
    align: "left",
    children: [{ text: "" }],
  },
];

export const parseTextBlock = (
  content: TextBlockState["content"],
): Array<SlateElement> => {
  if (!content.text.length) {
    return initialValue;
  }
  try {
    return JSON.parse(content.text);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log("Failed to parse text in EditTextModal:", error);
    return initialValue;
  }
};

const TextBlock = ({
  block: { content },
}: ContentBlockProps<TextBlockState>): React.ReactElement => {
  const editor = createEditor();

  if (!content.text.length) return <></>;

  return (
    <Slate editor={editor} value={parseTextBlock(content)} key={content.text}>
      <Box w="100%">
        <Editable readOnly renderLeaf={TextLeaf} renderElement={TextElement} />
      </Box>
    </Slate>
  );
};

export default TextBlock;
