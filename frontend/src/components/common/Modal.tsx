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
    onCancel: () => void;
    onConfirm: () => void;
    header?: string;
    bodyText?: string;
    cancelText?: string;
    confirmText?: string;
    alignButtonsRight?: boolean;
    confirmButtonColorScheme?: string;
    size?: string;
}

// to control modals:
// const { isOpen, onOpen, onClose } = useDisclosure();

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
        confirmButtonColorScheme,
        ...rest
    } = props;

    return (
        <ChakraModal isCentered onClose={onCancel} isOpen={isOpen} {...rest}>
            <ModalOverlay />
            <ModalContent>
                {header && (
                    <ModalHeader>
                        {header}
                    </ModalHeader>
                )}
                <ModalBody>
                    {bodyText && <Text>{bodyText}</Text>}
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onCancel}>
                        {cancelText}
                    </Button>
                    {!alignButtonsRight && <Spacer />}
                    <Button
                        variant={confirmButtonColorScheme ? "solid" : "default"}
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
