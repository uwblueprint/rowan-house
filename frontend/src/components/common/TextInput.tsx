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
  mb?: number;
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
  ...rest
}: TextInputProps): React.ReactElement => {
  return (
    <FormControl
      id={label}
      isRequired={isRequired}
      isInvalid={isInvalid}
      mb={5}
      {...rest}
    >
      <FormLabel fontWeight={400} color={isInvalid ? "red.500" : "blackAlpha"}>
        {label}
      </FormLabel>
      <Input
        type={label}
        placeholder={placeholder}
        errorBorderColor="red.600"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
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
