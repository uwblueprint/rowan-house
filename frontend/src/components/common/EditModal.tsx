import { Flex, Box } from "@chakra-ui/react";
import { TextInput } from "@components/textInput";
import React from "react";
import { Modal, ModalProps } from "./modal";

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
                    defaultValue={type}
                    // isInvalid={emailError != ""}
                    // errorMessage={emailError}
                    // onChange={(e) => setEmail(e.target.value)}
                    isRequired={true}
                ></TextInput>
                <Box width={8} />
                
            </Flex>
        </Modal>
    );
};

export default EditModal;
