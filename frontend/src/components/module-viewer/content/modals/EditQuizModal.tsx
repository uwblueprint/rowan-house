import { Button, FormLabel, Select, VStack, Flex } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useState, useEffect, ChangeEvent } from "react";

import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import { QuizBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";
import CheckBoxGroup from "../../../common/CheckBoxGroup";

const EditQuizModal = ({
  block: { content },
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<QuizBlockState>): React.ReactElement => {
  const [question, setQuestion] = useState(content.question ?? "");
  const [quizType, setQuizType] = useState(content.type ?? "single-select");
  const [choices, setChoices] = useState(content.choices ?? []);

  useEffect(() => {
    setQuestion(content.question);
    setQuizType(content.type);
    setChoices(content.choices);
  }, [isOpen, content]);

  const canSubmit =
    question.length > 0 &&
    choices.length >= 2 &&
    (quizType === "multi-select" || quizType === "single-select") &&
    choices.find((v) => v.correct) !== undefined;

  const onConfirm = () => {
    if (canSubmit) {
      onSave({
        type: quizType,
        question,
        choices,
      });
    }
  };

  const setAnswer = (answer: string, i: number) => {
    const newChoices = [...choices];
    newChoices[i] = { ...choices[i], answer };
    setChoices(newChoices);
  };

  const setCorrect = (statuses: boolean[]) => {
    const newChoices = [...choices];
    statuses.forEach((status, i) => {
      newChoices[i] = { ...choices[i], correct: status };
    });
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

  const setQuizTypeSafely = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    if (type === "multi-select" || type === "single-select") {
      setQuizType(type);
    } else {
      throw Error(`"type" attribute in Quiz received unknown value: ${type}`);
    }
  };

  return (
    <Modal
      header="Edit Quiz"
      size="xl"
      onConfirm={onConfirm}
      onCancel={onCancel}
      isOpen={isOpen}
      canSubmit={canSubmit}
    >
      <VStack alignItems="left">
        <TextInput
          label="Question"
          placeholder="Insert text here"
          defaultValue={question}
          onChange={setQuestion}
          mb={0}
        />
        <FormLabel fontWeight={400} color="blackAlpha">
          Type
        </FormLabel>
        <Select value={quizType} onChange={setQuizTypeSafely}>
          <option value="single-select">Single select</option>
          <option value="multi-select">Multiple select</option>
        </Select>
        <FormLabel fontWeight={400} color="blackAlpha">
          Answer choice
        </FormLabel>
        <CheckBoxGroup
          statuses={choices.map(({ correct }) => correct)}
          setStatus={setCorrect}
          multiSelect={quizType === "multi-select"}
        >
          {choices.map(({ answer }, i) => (
            <Flex justify="center" key={i}>
              <TextInput
                value={answer}
                placeholder="Enter choice"
                onChange={(a) => setAnswer(a, i)}
                flex={1}
                mb={0}
              />
              <Button variant="ghost" onClick={() => removeChoice(i)}>
                <DeleteIcon />
              </Button>
            </Flex>
          ))}
        </CheckBoxGroup>
        <Button variant="ghost" onClick={addQuiz}>
          + Add choice
        </Button>
      </VStack>
    </Modal>
  );
};

export default EditQuizModal;
