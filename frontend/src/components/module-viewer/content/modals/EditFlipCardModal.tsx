import {
  Button,
  FormLabel,
  Text,
  VStack,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import { FlipCardBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";

const EditFlipCardModal = ({
  block,
  isOpen,
  onClose,
  onSave,
}: EditContentModalProps<FlipCardBlockState>): React.ReactElement => {
  const [cards, setCards] = useState(block.content.cards ?? "");

  const onConfirm = () => {
    if (cards.length >= 1) {
      onSave({ cards });
    }
  };

  return (
    <Modal
      header="Edit FlipCarding"
      size="xl"
      onConfirm={onConfirm}
      onCancel={onClose}
      isOpen={isOpen}
      canSubmit={cards.length >= 1}
    >
      <VStack alignItems="left">
        <p>hi!</p>
      </VStack>
    </Modal>
  );
};

export default EditFlipCardModal;
