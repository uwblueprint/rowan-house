import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputProps,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export interface TextAreaProps extends InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  errorMessage,
  helperText,
  isInvalid,
  isRequired,
}) => {
  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={isInvalid} mb={5}>
      <FormLabel fontWeight={400} color={isInvalid ? "red.500" : "blackAlpha"}>
        {label}
      </FormLabel>
      <Textarea placeholder={placeholder} errorBorderColor="red.600" />
      {errorMessage && (
        <FormErrorMessage>
          <WarningIcon mr={2} /> {errorMessage}
        </FormErrorMessage>
      )}
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
