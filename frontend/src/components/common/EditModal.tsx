import { Flex, Box, VStack } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "./TextInput";
import { Modal, ModalProps } from "./Modal";
import { SwitchInput } from "./SwitchInput";
import { TextArea } from "./TextArea";

export interface EditModalProps extends ModalProps {
  type: string;
  name: string;
  description: string;
  visibility: boolean;
  // setEmail: (value: string) => void;
  // setRole: (value: RoleType) => void;
  // currentEmail: string;
  // currentRole: RoleType;
  // emailError: string;
  // roleError: string;
}

const EditModal: React.FC<EditModalProps> = (props) => {
  const {
    type,
    name,
    description,
    visibility,
    // setEmail,
    // setRole,
    // currentEmail,
    // currentRole,
    // emailError,
    // roleError,
  } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal size="lg" header={`Edit ${type} Details`} {...props}>
      <VStack>
        <TextInput
          name={`${type} Name:`}
          label={`${type} Name:`}
          defaultValue={name}
          // isInvalid={emailError != ""}
          // errorMessage={emailError}
          // onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
        <TextArea
          name={`${type} Description:`}
          label={`${type} Description:`}
          defaultValue={description}
          // onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
        <SwitchInput
          name={`Visibility: ${visibility ? "Public" : "Private"}`}
          enabledName="Public"
          disabledName="Private"
          isEnabled={visibility}
        />
        <Box width={8} />
      </VStack>
    </Modal>
  );
};

EditModal.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
};

export default EditModal;
