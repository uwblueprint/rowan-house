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
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
  flex?: number;
  mb?: number;
}

export const TextInput = ({
  onChange,
  label,
  placeholder,
  errorMessage,
  helperText,
  isInvalid,
  value,
  defaultValue = undefined,
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
      {label && (
        <FormLabel
          fontWeight={400}
          color={isInvalid ? "red.500" : "blackAlpha"}
        >
          {label}
        </FormLabel>
      )}
      <Input
        type={label}
        placeholder={placeholder}
        defaultValue={defaultValue}
        errorBorderColor="red.600"
        onChange={(e) => onChange(e.target.value)}
        value={value}
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
