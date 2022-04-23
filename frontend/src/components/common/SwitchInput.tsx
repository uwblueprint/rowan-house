import { Switch, FormControl, FormLabel, InputProps } from "@chakra-ui/react";

import React, { useState } from "react";

export interface SwitchProps extends InputProps {
  name: string;
  isEnabled?: boolean;
  enabledName?: string;
  disabledName?: string;
}

export const SwitchInput: React.FC<SwitchProps> = ({
  name,
  isEnabled,
  enabledName,
  disabledName,
}) => {
  const [enabled, setEnabled] = useState(isEnabled);
  const toggleLabel = () => {
    setEnabled(!enabled);
  };
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel>{enabled ? enabledName : disabledName}</FormLabel>
      <Switch id={name} defaultIsChecked={isEnabled} onChange={toggleLabel} />
    </FormControl>
  );
};