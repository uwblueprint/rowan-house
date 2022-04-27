import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export interface TextInputProps {
  onChange: (result: string) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  isInvalid?: boolean;
  defaultValue?: string;
  isRequired?: boolean;
}

export const TextInput = ({
  onChange,
  label,
  placeholder,
  errorMessage,
  helperText,
  isInvalid,
  defaultValue = "",
  isRequired = false,
}: TextInputProps): React.ReactElement => {
  return (
    <FormControl id={label} isInvalid={isInvalid} mb={5}>
      <FormLabel fontWeight={400} color={isInvalid ? "red.500" : "blackAlpha"}>
        {label}
      </FormLabel>
      <Input
        type={label}
        placeholder={placeholder}
        errorBorderColor="red.600"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
        isRequired={isRequired}
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
