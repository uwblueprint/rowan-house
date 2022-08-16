import { Center, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  ButtonBlockState,
  ContentTypeEnum,
} from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import { ButtonBlock } from "../blocks";

const EditButtonModal = ({
  block,
  isOpen,
  onClose,
  onSave,
}: EditContentModalProps<ButtonBlockState>): React.ReactElement => {
  const [link, setLink] = useState(block.content.link ?? "");
  const [text, setText] = useState(block.content.text ?? "");

  const onConfirm = () => {
    if (link !== "" && text !== "") {
      onSave({
        link,
        text,
      });
    }
  };

  // Append the prefix if it does not exist
  const setLinkSafely = (str: string) => {
    const newLink = str.includes("https://") ? str : `https://${str}`;
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
        <Text variant="sm" marginTop="1rem">
          Preview
        </Text>
        <Center borderWidth="1px" borderRadius="6px" padding="4rem">
          <ButtonBlock
            block={{
              type: ContentTypeEnum.BUTTON,
              id: "",
              content: {
                text: text.length ? text : "Text",
                link,
              },
            }}
          />
        </Center>
      </VStack>
    </Modal>
  );
};

export default EditButtonModal;
