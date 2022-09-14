/* eslint-disable react/forbid-prop-types */
import React from "react";
import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
} from "@chakra-ui/react";

export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDontSave: () => void;
  onSave: () => void;
}

export const SaveModal = ({
  isOpen,
  onCancel,
  onDontSave,
  onSave,
  ...rest
}: ModalProps): React.ReactElement => {
  return (
    <ChakraModal isCentered onClose={onCancel} isOpen={isOpen} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save changes?</ModalHeader>
        <ModalBody>
          <Text>
            Are you sure you want to leave with unsaved changes? The new edits
            will be lost.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onSave} mr="1rem">
            Save
          </Button>
          <Button variant="outline" onClick={onDontSave} mr="1rem">
            Don&apos;t Save
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
