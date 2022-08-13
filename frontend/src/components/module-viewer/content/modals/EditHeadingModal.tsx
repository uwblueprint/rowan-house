import {
  Select,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { HeadingBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import EditorContext from "../../../../contexts/ModuleEditorContext";
import {
  EditContentModalProps,
  ValidHeadingSizes,
} from "../../../../types/ModuleEditorTypes";

const EditHeadingModal = ({
  block,
  index,
  isOpen,
  onClose,
}: EditContentModalProps<HeadingBlockState>): React.ReactElement => {
  const [text, setText] = useState(block.content.text ?? "why");
  const [size, setSize] = useState(
    block.content.size ?? ValidHeadingSizes.heading1,
  );
  const [invalid, setInvalid] = useState(false);
  const context = useContext(EditorContext);
  if (!context) return <></>;
  const { dispatch } = context;

  const onSave = () => {
    if (!(size && text)) {
      setInvalid(true);
      return;
    }
    const newBlock = {
      ...block,
      content: {
        ...block.content,
        text,
        size,
      },
    };

    dispatch({
      type: "update-block",
      value: {
        index,
        block: newBlock,
      },
    });

    onClose();
  };

  return (
    <Modal
      size="xl"
      header="Heading"
      onConfirm={onSave}
      onCancel={onClose}
      isOpen={isOpen}
    >
      <FormControl isInvalid={invalid} isRequired>
        <FormLabel
          htmlFor="headingSize"
          variant="caption-md"
          marginTop="1vh"
          marginBottom="1vh"
        >
          Heading Style
        </FormLabel>
        <Select
          type="headingSize"
          defaultValue={size}
          onChange={(newSize) => {
            setInvalid(false);
            setSize(newSize.target.value);
          }}
        >
          <option value={ValidHeadingSizes.heading1}>
            Heading 1 ({ValidHeadingSizes.heading1})
          </option>
          <option value={ValidHeadingSizes.heading2}>
            Heading 2 ({ValidHeadingSizes.heading2})
          </option>
          <option value={ValidHeadingSizes.heading3}>
            Heading 3 ({ValidHeadingSizes.heading3})
          </option>
          <option value={ValidHeadingSizes.heading4}>
            Heading 4({ValidHeadingSizes.heading4})
          </option>
        </Select>
        <FormLabel
          htmlFor="displayText"
          variant="caption-md"
          marginTop="2vh"
          marginBottom="1vh"
        >
          Display Text
        </FormLabel>
        <Input
          label="Display Text"
          type="displayText"
          isRequired
          defaultValue={text}
          onChange={(newText) => {
            setInvalid(false);
            setText(newText.target.value);
          }}
        />
        <FormLabel
          htmlFor="preview"
          variant="caption-md"
          marginTop="2vh"
          marginBottom="1vh"
        >
          Preview
        </FormLabel>
        <Heading
          type="preview"
          fontSize={size}
          borderWidth="1px" // CHECK THIS WITH JULIAN AS WELL
          borderRadius="5px"
          align="center"
          padding="3vh 0"
        >
          {text || "Heading"}
        </Heading>
      </FormControl>
    </Modal>
  );
};

export default EditHeadingModal;
