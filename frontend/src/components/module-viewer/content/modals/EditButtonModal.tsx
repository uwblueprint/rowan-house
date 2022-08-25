import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ButtonBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import BlockPreview from "./BlockPreview";
import CustomButton from "../blocks/CustomButton";

const EditButtonModal = ({
  block,
  isOpen,
  onClose,
  onSave,
}: EditContentModalProps<ButtonBlockState>): React.ReactElement => {
  const [link, setLink] = useState(block.content.link ?? "");
  const [text, setText] = useState(block.content.text ?? "");

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
      header="Edit button component"
      onConfirm={onConfirm}
      onCancel={onClose}
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
