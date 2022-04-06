import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputProps,
  FormHelperText,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { WarningIcon } from "@chakra-ui/icons";

export interface TextInputProps extends InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  isInvalid?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  errorMessage,
  helperText,
  isInvalid,
  ...rest
}) => {
  return (
    <FormControl id={name} isInvalid={isInvalid} mb={5}>
      <FormLabel fontWeight={400} color={isInvalid ? "red.500" : "blackAlpha"}>
        {label}
      </FormLabel>
      <Input
        type={name}
        placeholder={placeholder}
        errorBorderColor="red.600"
        // {...rest}
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

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  isInvalid: PropTypes.bool,
};