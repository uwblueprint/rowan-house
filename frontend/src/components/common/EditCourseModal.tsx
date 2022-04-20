import { Flex, Box, VStack } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "./TextInput";
import { Modal, ModalProps } from "./Modal";
import { SwitchInput } from "./SwitchInput";
import { TextArea } from "./TextArea";

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
    <Modal size="lg" header={`Edit ${type} Details`} {...props}>
      <VStack>
        <TextInput
          name={`${type} Name:`}
          label={`${type} Name:`}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
        />
        <TextArea
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

EditCourseModal.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
};

export default EditCourseModal;
