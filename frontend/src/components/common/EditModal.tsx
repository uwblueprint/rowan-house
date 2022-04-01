import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import { TextInput } from "./TextInput";
import { Modal, ModalProps } from "./Modal";
import { SwitchInput } from "./SwitchInput";

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
    <Modal size="lg" header={`Edit ${type}`} {...props}>
      <Flex>
        <TextInput
          name={`${type} Name:`}
          label="name"
          defaultValue={name}
          // isInvalid={emailError != ""}
          // errorMessage={emailError}
          // onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
        <TextInput
          name={`${type} Description:`}
          label="description"
          defaultValue={description}
          // onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
        <SwitchInput
          name={`Visibility: ${visibility ? "Public" : "Private"}`}
          isEnabled={visibility}
        />
        <Box width={8} />
      </Flex>
    </Modal>
  );
};

export default EditModal;
