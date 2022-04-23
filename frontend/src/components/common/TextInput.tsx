import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputProps,
  FormHelperText,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export interface TextInputProps extends InputProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  isInvalid?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  errorMessage,
  helperText,
  isInvalid,
}) => {
  return (
    <FormControl id={label} isInvalid={isInvalid} mb={5}>
      <FormLabel fontWeight={400} color={isInvalid ? "red.500" : "blackAlpha"}>
        {label}
      </FormLabel>
      <Input
        type={label}
        placeholder={placeholder}
        errorBorderColor="red.600"
      />
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
