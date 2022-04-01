import {
  Flex,
  Box,
  Switch,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputProps,
  FormHelperText,
} from "@chakra-ui/react";

import React from "react";

export interface SwitchProps extends InputProps {
  name: string;
  isEnabled?: boolean;
}

export const SwitchInput: React.FC<SwitchProps> = ({
  name,
  isEnabled,
  ...rest
}) => {
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel>{name}</FormLabel>
      <Switch id={name} defaultIsChecked={isEnabled} />
    </FormControl>
  );
};
