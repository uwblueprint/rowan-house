import {
  Spacer,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import React, { useState } from "react";

export interface SwitchProps {
  onChange: (result: boolean) => void;
  isEnabled: boolean;
  enabledName: string;
  disabledName: string;
  prefix?: string;
  isSpaced?: boolean;
}

export const SwitchInput = ({
  onChange,
  isEnabled,
  enabledName,
  disabledName,
  prefix = "",
  isSpaced = true,
}: SwitchProps) => {
  const [enabled, setEnabled] = useState(isEnabled);
  const toggleLabel = () => {
    setEnabled(!enabled);
    onChange(!enabled);
  };

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel>{prefix && `${prefix} `}{enabled ? enabledName : disabledName}</FormLabel>
      {isSpaced && <Spacer />}
      <Switch defaultIsChecked={isEnabled} onChange={toggleLabel} />
    </FormControl>
  );
};
