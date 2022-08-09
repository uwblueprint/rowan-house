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
  Spacer,
} from "@chakra-ui/react";

export interface ModalProps {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onCancel: () => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onConfirm: () => void;
  header?: string;
  bodyText?: string;
  cancelText?: string;
  confirmText?: string;
  spreadButtons?: boolean;
  size?: string;
  children?: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onCancel,
  onConfirm,
  header,
  bodyText,
  cancelText = "Cancel",
  confirmText = "Confirm",
  spreadButtons = false,
  children,
  ...rest
}: ModalProps): React.ReactElement => {
  return (
    <ChakraModal isCentered onClose={onCancel} isOpen={isOpen} {...rest}>
      <ModalOverlay />
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody>
          {bodyText && <Text>{bodyText}</Text>}
          {/* eslint-disable-next-line react/destructuring-assignment */}
          {children}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onConfirm} mr="1rem">
            {confirmText}
          </Button>
          {spreadButtons && <Spacer />}
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
