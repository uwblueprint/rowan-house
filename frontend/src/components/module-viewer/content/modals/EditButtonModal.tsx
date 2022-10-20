import { VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ButtonBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import BlockPreview from "./BlockPreview";
import CustomButton from "../blocks/CustomButton";

const EditButtonModal = ({
  block: { content },
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<ButtonBlockState>): React.ReactElement => {
  const [link, setLink] = useState(content.link ?? "");
  const [text, setText] = useState(content.text ?? "");

  useEffect(() => {
    setLink(content.link);
    setText(content.text);
  }, [isOpen, content]);

  const onConfirm = () => {
    if (link && text) {
      onSave({
        link,
        text,
      });
    }
  };

  // Append the prefix if it does not exist
  const setLinkSafely = (str: string) => {
    const newLink = str.includes("://") ? str : `https://${str}`;
    setLink(newLink);
  };

  return (
    <Modal
      size="xl"
      header="Edit Button"
      onConfirm={onConfirm}
      onCancel={onCancel}
      isOpen={isOpen}
      canSubmit={link !== "" && text !== ""}
    >
      <VStack alignItems="left">
        <TextInput
          label="Display Text"
          defaultValue={text}
          onChange={setText}
          isInvalid={text === ""}
        />
        <TextInput
          label="Link"
          defaultValue={link}
          onChange={setLinkSafely}
          isInvalid={link === ""}
        />
        <BlockPreview>
          <CustomButton link={link} text={text} />
        </BlockPreview>
      </VStack>
    </Modal>
  );
};

export default EditButtonModal;
