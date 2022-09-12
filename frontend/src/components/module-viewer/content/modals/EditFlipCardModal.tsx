import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Circle,
  HStack,
} from "@chakra-ui/react";
import { AddIcon, SmallCloseIcon } from "@chakra-ui/icons";
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
  const [tabIndex, setTabIndex] = useState(0);

  const addCard = () => {
    setCards((state) => {
      setTabIndex(state.length);
      return [
        ...state,
        {
          front: "",
          back: "",
        },
      ];
    });
  };

  const setCard = ({ f, b }: { f?: string; b?: string }, i: number) => {
    const newCards = [...cards];
    if (f) newCards[i] = { ...cards[i], front: f };
    if (b) newCards[i] = { ...cards[i], back: b };
    setCards(newCards);
  };

  const removeCard = (i: number) => {
    if (tabIndex === cards.length - 1) {
      setTabIndex(tabIndex - 1);
    }
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
      <Tabs
        variant="soft-rounded"
        index={tabIndex}
        onChange={(i) => setTabIndex(i)}
      >
        <TabList>
          <HStack spacing="8px" align="center">
            {cards.map((_, i) => (
              <Tab
                key={i}
                bg="#F3F3F3"
                _selected={{
                  bg: "text.purplegrey",
                  color: "brand.royal",
                  borderColor: "brand.royal",
                  border: "2px",
                }}
              >
                Card {i + 1}
                {i === tabIndex && cards.length !== 1 && (
                  <SmallCloseIcon ml="1rem" onClick={() => removeCard(i)} />
                )}
              </Tab>
            ))}
            {cards.length < 5 && (
              <Circle
                _hover={{ cursor: "pointer" }}
                bg="background.light"
                p="8px"
                onClick={addCard}
              >
                <AddIcon />
              </Circle>
            )}
          </HStack>
        </TabList>

        <TabPanels>
          {cards.map(({ front, back }, i) => (
            <TabPanel key={i}>
              <VStack alignItems="left">
                <TextInput
                  label="Front Text"
                  defaultValue={front}
                  placeholder="Insert text here"
                  onChange={(f) => setCard({ f }, i)}
                />
                <TextInput
                  label="Back Text"
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
