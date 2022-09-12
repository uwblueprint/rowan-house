import { Select, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { HeadingBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import {
  EditContentModalProps,
  ValidHeadingSizes,
} from "../../../../types/ModuleEditorTypes";
import CustomHeading from "../blocks/CustomHeading";
import BlockPreview from "./BlockPreview";

const EditHeadingModal = ({
  block,
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<HeadingBlockState>): React.ReactElement => {
  const [text, setText] = useState(block.content.text);
  const [size, setSize] = useState(block.content.size);
  const [invalid, setInvalid] = useState(false);

  const onConfirm = () => {
    if (!(size && text)) {
      setInvalid(true);
      return;
    }
    onSave({
      text,
      size,
    });
  };

  return (
    <Modal
      size="xl"
      header="Heading"
      onConfirm={onConfirm}
      onCancel={onCancel}
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
            Heading 4 ({ValidHeadingSizes.heading4})
          </option>
        </Select>
      </FormControl>
      <FormControl isInvalid={invalid} isRequired>
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
      </FormControl>
      <BlockPreview>
        <CustomHeading size={size} text={text} />
      </BlockPreview>
    </Modal>
  );
};

export default EditHeadingModal;
