import {
  Button,
  FormLabel,
  Text,
  VStack,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  const [cards, setCards] = useState<FlipCardBlockState["content"]["cards"]>(
    block.content.cards ?? "",
  );

  const addCard = () => {
    setCards([
      ...cards,
      {
        front: "",
        back: "",
      },
    ]);
  };

  const setCard = ({ f, b }: { f?: string; b?: string }, i: number) => {
    const newCards = [...cards];
    if (f) newCards[i] = { ...cards[i], front: f };
    if (b) newCards[i] = { ...cards[i], back: b };
    setCards(newCards);
  };

  const removeCard = (i: number) => {
    const newCards = [...cards];
    newCards.splice(i, 1);
    setCards([...newCards]);
  };

  const onConfirm = () => {
    if (cards.length >= 1) {
      onSave({ cards });
    }
  };

  return (
    <Modal
      header="Edit Flip Cards"
      size="xl"
      onConfirm={onConfirm}
      onCancel={onClose}
      isOpen={isOpen}
      canSubmit={cards.length >= 1}
    >
      <Tabs variant="unstyled">
        <TabList>
          {cards.map((_, i) => (
            <Tab key={i}>Card {i + 1}</Tab>
          ))}
          <Button variant="ghost" onClick={addCard}>
            +
          </Button>
        </TabList>

        <TabPanels>
          {cards.map(({ front, back }, i) => (
            <TabPanel key={i}>
              <VStack alignItems="left">
                <TextInput
                  defaultValue={front}
                  placeholder="Insert text here"
                  onChange={(f) => setCard({ f }, i)}
                />
                <TextInput
                  defaultValue={back}
                  placeholder="Insert text here"
                  onChange={(b) => setCard({ b }, i)}
                />
              </VStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Modal>
  );
};

export default EditFlipCardModal;
