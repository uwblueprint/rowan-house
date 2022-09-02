import React, { useState, ChangeEvent } from "react";
import { useSlate } from "slate-react";
import { IconButton, useDisclosure, Textarea } from "@chakra-ui/react";
import { Editor, Transforms, Range, Element as SlateElement } from "slate";
import { IoLinkOutline } from "react-icons/io5";
import { Modal } from "../../../common/Modal";
import { TextEditor, LinkElement } from "../../../../types/ModuleEditorTypes";

const isLinkActive = (editor: TextEditor) => {
  const [link] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
    }),
  );
  return !!link;
};

const unwrapLink = (editor: TextEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

export const wrapLink = (editor: TextEditor, url: string): void => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const insertLink = (editor: TextEditor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const LinkButton = (): React.ReactElement => {
  const editor = useSlate();
  const {
    isOpen: isLinkOpen,
    onOpen: onLinkOpen,
    onClose: onLinkClose,
  } = useDisclosure();
  const [url, setUrl] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUrl(e.target.value);
  };
  const onConfirm = () => {
    setUrl(url);
    if (!url) return;
    const newUrl = url.includes("://") ? url : `https://${url}`;
    insertLink(editor, newUrl);
    setUrl("");
    onLinkClose();
  };
  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="purple"
        aria-label="align left"
        size="sm"
        icon={<IoLinkOutline />}
        isActive={isLinkActive(editor)}
        onClick={(event) => {
          event.preventDefault();
          if (isLinkActive(editor)) {
            unwrapLink(editor);
          } else {
            onLinkOpen();
          }
        }}
      />
      <Modal
        size="xs"
        header="Add link"
        onConfirm={onConfirm}
        onCancel={onLinkClose}
        isOpen={isLinkOpen}
      >
        <Textarea
          value={url}
          onChange={handleInputChange}
          placeholder="Type or paste URL"
          resize="none"
        />
      </Modal>
    </>
  );
};

export default LinkButton;
