import React from "react";
import { Select } from "@chakra-ui/react";
import { Role } from "../../types/AuthTypes";

export interface SelectInputProps {
  onChange: (result: Role) => void;
  value?: string;
  optionsMap: { label: string; value: string }[];
}

const SelectInput = ({
  onChange,
  value = "",
  optionsMap,
}: SelectInputProps): React.ReactElement => {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value as Role)}>
      {optionsMap.map((options) => (
        <option key={options.value} value={options.value}>
          {options.label}
        </option>
      ))}
      ;
    </Select>
  );
};

export default SelectInput;
