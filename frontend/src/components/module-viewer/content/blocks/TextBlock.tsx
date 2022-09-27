import React, { useCallback } from "react";
import { createEditor } from "slate";
import { Editable, Slate } from "slate-react";
import { Box, Link } from "@chakra-ui/react";

import {
  ContentBlockProps,
  TextBlockState,
} from "../../../../types/ContentBlockTypes";
import { ElementPropTypes, LeafPropTypes } from "../../../../types/ModuleEditorTypes";

export const TextLeaf = ({ attributes, children, leaf }: LeafPropTypes) => {
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

export const TextElement = ({ attributes, children, element }: ElementPropTypes) => {
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

const TextBlock = ({
  block: { content },
}: ContentBlockProps<TextBlockState>): React.ReactElement => {
  const editor = createEditor();
  
  const renderLeaf = useCallback((props) => {
    return <TextLeaf {...props} />;
  }, []);
  const renderElement = useCallback((props) => <TextElement {...props} />, []);

  if (!content.text.length) return <></>;

  return (
    <Slate
      editor={editor}
      value={JSON.parse(content.text)}
    >
      <Box w="100%">
        <Editable
          contentEditable={false}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </Box>
    </Slate>
  );
};

export default TextBlock;
