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
import { QuizBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";
import { SwitchInput } from "../../../common/SwitchInput";

const EditQuizModal = ({
  block,
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<QuizBlockState>): React.ReactElement => {
  const [question, setQuestion] = useState(block.content.question ?? "");
  const [choices, setChoices] = useState(block.content.choices ?? []);

  const onConfirm = () => {
    if (choices.length >= 2) {
      onSave({
        type: "MS",
        question,
        choices,
      });
    }
  };

  const setChoice = ({ a, c }: { a?: string; c?: boolean }, i: number) => {
    const newChoices = [...choices];
    if (a) newChoices[i] = { ...choices[i], answer: a };
    if (c) newChoices[i] = { ...choices[i], correct: c };
    setChoices(newChoices);
  };

  const addQuiz = () => {
    setChoices([
      ...choices,
      {
        answer: "",
        correct: false,
      },
    ]);
  };

  const removeChoice = (i: number) => {
    const newChoices = [...choices];
    newChoices.splice(i, 1);
    setChoices([...newChoices]);
  };

  return (
    <Modal
      header="Edit Quiz"
      size="xl"
      onConfirm={onConfirm}
      onCancel={onCancel}
      isOpen={isOpen}
      canSubmit={choices.length >= 2}
    >
      <VStack alignItems="left">
        <TextInput
          label="Question (optional)"
          placeholder="Insert text here"
          defaultValue={question}
          onChange={setQuestion}
        />
        <FormLabel fontWeight={400} color="blackAlpha">
          Answer choice
        </FormLabel>
        <SimpleGrid
          templateColumns="30px 40px 1fr 30px"
          align="center"
          spacingX={2}
          spacingY={0}
        >
          {choices.map(({ answer, correct }, i) => (
            <React.Fragment key={i}>
              <Center>
                <Text>{i + 1}.</Text>
              </Center>
              <SwitchInput
                isEnabled={correct}
                enabledName=""
                disabledName=""
                onChange={(c) => setChoice({ c }, i)}
              />
              <TextInput
                defaultValue={answer}
                placeholder="Enter choice"
                onChange={(a) => setChoice({ a }, i)}
                mb={0}
              />
              <Center>
                <Button variant="ghost" onClick={() => removeChoice(i)}>
                  <DeleteIcon />
                </Button>
              </Center>
            </React.Fragment>
          ))}
        </SimpleGrid>
        <Button variant="ghost" onClick={addQuiz}>
          + Add choice
        </Button>
      </VStack>
    </Modal>
  );
};

export default EditQuizModal;
