import {
  Button,
  FormLabel,
  Select,
  VStack,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React, { useState, ChangeEvent } from "react";

import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import { QuizBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import { TextInput } from "../../../common/TextInput";
import CheckBox from "../../../common/CheckBox";

const EditQuizModal = ({
  block: { content },
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<QuizBlockState>): React.ReactElement => {
  const [question, setQuestion] = useState(content.question ?? "");
  const [quizType, setQuizType] = useState(content.type ?? "MC");
  const [choices, setChoices] = useState(content.choices ?? []);

  const findCorrectAnswers = () => {
    const correctAnswers: number[] = [];
    choices.forEach(({ correct }, i) => {
      if (correct) correctAnswers.push(i);
    });
    return correctAnswers;
  };

  const canSubmit =
    question.length > 0 &&
    choices.length >= 2 &&
    (quizType === "MS" || quizType === "MC") &&
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

  const setCorrect = (
    isCorrect: boolean,
    i: number,
    { onlyOneCorrect = false },
  ) => {
    let newChoices = [...choices];
    // Ensure only one answer is correct for MC
    if (onlyOneCorrect && isCorrect) {
      newChoices = newChoices.map(({ answer }) => ({ answer, correct: false }));
    }
    newChoices[i] = { ...choices[i], correct: isCorrect };
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
    if (type === "MS" || type === "MC") {
      setQuizType(type);
    } else {
      throw Error(`"type" attribute in Quiz received unknown value: ${type}`);
    }
    if (type === "MC" && findCorrectAnswers()[0]) {
      setCorrect(true, findCorrectAnswers()[0], { onlyOneCorrect: true });
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
          <option value="MC">Single select</option>
          <option value="MS">Multiple select</option>
        </Select>
        <FormLabel fontWeight={400} color="blackAlpha">
          Answer choice
        </FormLabel>
        <SimpleGrid
          templateColumns="20px 1fr 30px"
          align="center"
          spacingX={2}
          spacingY={0}
        >
          {choices.map(({ answer, correct }, i) => (
            <React.Fragment key={i}>
              <CheckBox 
                status={correct}
                radio={quizType === "MC"}
                onClick={() =>
                  setCorrect(!correct, i, { onlyOneCorrect: quizType === "MC" })
                }
              />
              <TextInput
                defaultValue={answer}
                placeholder="Enter choice"
                onChange={(a) => setAnswer(a, i)}
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
