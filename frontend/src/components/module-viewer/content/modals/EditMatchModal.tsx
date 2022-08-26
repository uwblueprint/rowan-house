import { Button, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { MatchBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

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

  const setMatch = (i: number, prompt?: string, answer?: string) => {
    const newMatches = [...matches];
    if (prompt) newMatches[i] = {...matches[i], prompt};
    if (answer) newMatches[i] = {...matches[i], answer};
    setMatches(newMatches);
  }

  const addMatch = () => {
    setMatches([...matches, {
      prompt: "",
      answer: "",
    }])
  }

  return (
    <Modal
      size="xl"
      header="Edit matching component"
      onConfirm={onConfirm}
      onCancel={onClose}
      isOpen={isOpen}
      canSubmit={matches.length >= 2}
    >
      <VStack alignItems="left">
        <TextInput
          label="Question (optional)"
          defaultValue={question}
          onChange={setQuestion}
        />
        {matches.map(({prompt, answer}, i) => (
          <Flex key={i}>
            <TextInput
              defaultValue={prompt}
              onChange={(p) => setMatch(i, p)}
              isInvalid={prompt === ""}
            />
            <TextInput
              defaultValue={answer}
              onChange={(a) => setMatch(i, prompt, a)}
              isInvalid={answer === ""}
            />
          </Flex>
        ))}
        <Button onClick={addMatch}>Add Match</Button>
      </VStack>
    </Modal>
  );
};

export default EditMatchModal;
