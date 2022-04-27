import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export interface TextAreaProps {
  onChange: (result: string) => void; 
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  isInvalid?: boolean;
  defaultValue?: string;
  isRequired?: boolean;
}

export const TextArea = ({
  onChange,
  label,
  placeholder,
  errorMessage,
  helperText,
  isInvalid,
  defaultValue="",
  isRequired=false,
}: TextAreaProps) => {
  return (
    <FormControl
      id={label}
      isRequired={isRequired}
      isInvalid={isInvalid}
      mb={5}
    >
      <FormLabel fontWeight={400} color={isInvalid ? "red.500" : "blackAlpha"}>
        {label}
      </FormLabel>
      <Textarea
        placeholder={placeholder}
        errorBorderColor="red.600"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
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
