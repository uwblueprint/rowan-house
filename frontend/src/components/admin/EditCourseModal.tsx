import { Flex, Box, VStack } from "@chakra-ui/react";
import React from "react";
import { TextInput } from "../common/TextInput";
import { Modal, ModalProps } from "../common/Modal";
import { SwitchInput } from "../common/SwitchInput";
import { TextArea } from "../common/TextArea";

export interface EditCourseModalProps extends ModalProps {
  type: string;
  name: string;
  description: string;
  visibility: boolean;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
  setVisibility: (value: boolean) => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = (props) => {
  const {
    type,
    name,
    description,
    visibility,
    setName,
    setDescription,
    setVisibility,
  } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal size="lg" header={`Edit ${type}`} {...props}>
      <VStack>
        <TextInput
          name={`${type} Name:`}
          label={`${type} Name:`}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
        />
        <TextInput
          name={`${type} Description:`}
          label={`${type} Description:`}
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          isRequired
        />
        <SwitchInput
          name={`Visibility: ${visibility ? "Public" : "Private"}`}
          enabledName="Public"
          disabledName="Private"
          isEnabled={visibility}
          onChange={(e) => setVisibility(e.target.checked)}
        />
        <Box width={8} />
      </VStack>
    </Modal>
  );
};

export default EditCourseModal;