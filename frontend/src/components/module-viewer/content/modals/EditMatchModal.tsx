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
import { MatchBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";

const EditMatchModal = ({
  block,
  isOpen,
  onClose,
  onSave,
}: EditContentModalProps<MatchBlockState>): React.ReactElement => {
  const [question, setQuestion] = useState(block.content.question ?? "");
  const [matches, setMatches] = useState(block.content.matches ?? []);

  const onConfirm = () => {
    if (matches.length >= 2) {
      onSave({
        question,
        matches,
      });
    }
  };

  const setMatch = ({ p, a }: { p?: string; a?: string }, i: number) => {
    const newMatches = [...matches];
    if (p) newMatches[i] = { ...matches[i], prompt: p };
    if (a) newMatches[i] = { ...matches[i], answer: a };
    setMatches(newMatches);
  };

  const addMatch = () => {
    setMatches([
      ...matches,
      {
        prompt: "",
        answer: "",
      },
    ]);
  };

  const removeMatch = (i: number) => {
    const newMatches = [...matches];
    newMatches.splice(i, 1);
    setMatches([...newMatches]);
  };

  return (
    <Modal
      header="Edit Matching"
      size="xl"
      onConfirm={onConfirm}
      onCancel={onClose}
      isOpen={isOpen}
      canSubmit={matches.length >= 2}
    >
      <VStack alignItems="left">
        <TextInput
          label="Question (optional)"
          placeholder="Insert text here"
          defaultValue={question}
          onChange={setQuestion}
        />
        <SimpleGrid
          templateColumns="30px 1fr 1fr 30px"
          align="center"
          spacingX={2}
          spacingY={0}
        >
          <div />
          <FormLabel fontWeight={400} color="blackAlpha">
            Prompt
          </FormLabel>
          <FormLabel fontWeight={400} color="blackAlpha">
            Match
          </FormLabel>
          <div />
          {matches.map(({ prompt, answer }, i) => (
            <>
              <Center>
                <Text>{i + 1}.</Text>
              </Center>
              <TextInput
                defaultValue={prompt}
                placeholder="Insert text here"
                onChange={(p) => setMatch({ p }, i)}
                mb={0}
              />
              <TextInput
                defaultValue={answer}
                placeholder="Insert text here"
                onChange={(a) => setMatch({ a }, i)}
                mb={0}
              />
              <Center>
                <Button variant="ghost" onClick={() => removeMatch(i)}>
                  <DeleteIcon />
                </Button>
              </Center>
            </>
          ))}
        </SimpleGrid>
        <Button variant="ghost" onClick={addMatch}>
          + Add Match
        </Button>
      </VStack>
    </Modal>
  );
};

export default EditMatchModal;
