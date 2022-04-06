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
  ModalCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

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
  alignButtonsRight?: boolean;
  cancelButtonColorScheme?: string;
  confirmButtonColorScheme?: string;
  size?: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onCancel,
    onConfirm,
    header,
    bodyText,
    cancelText = "Cancel",
    confirmText = "Confirm",
    alignButtonsRight = true,
    cancelButtonColorScheme,
    confirmButtonColorScheme,
    children,
    ...rest
  } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ChakraModal isCentered onClose={onCancel} isOpen={isOpen} {...rest}>
      <ModalOverlay />
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>
          {bodyText && <Text>{bodyText}</Text>}
          {/* eslint-disable-next-line react/destructuring-assignment */}
          {props.children}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={cancelButtonColorScheme}
            mr={3}
            onClick={onCancel}
            variant="outline"
          >
            {cancelText}
          </Button>
          {!alignButtonsRight && <Spacer />}
          <Button
            variant={confirmButtonColorScheme ? "solid" : "default"}
            mr={3}
            colorScheme={confirmButtonColorScheme}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.any.isRequired,
  onConfirm: PropTypes.any.isRequired,
  header: PropTypes.string,
  bodyText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  alignButtonsRight: PropTypes.bool,
  cancelButtonColorScheme: PropTypes.string,
  confirmButtonColorScheme: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
};
