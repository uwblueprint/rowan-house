import {
  Spacer,
  Switch,
  FormControl,
  FormLabel,
  InputProps,
} from "@chakra-ui/react";

import React, { useState } from "react";

export interface SwitchProps extends InputProps {
  isEnabled?: boolean;
  enabledName?: string;
  disabledName?: string;
  isSpaced?: boolean;
}

export const SwitchInput: React.FC<SwitchProps> = ({
  isEnabled,
  enabledName,
  disabledName,
  isSpaced = true,
}) => {
  const [enabled, setEnabled] = useState(isEnabled);
  const toggleLabel = () => {
    setEnabled(!enabled);
  };
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel>{enabled ? enabledName : disabledName}</FormLabel>
      {isSpaced && <Spacer />}
      <Switch defaultIsChecked={isEnabled} onChange={toggleLabel} />
    </FormControl>
  );
};
