import React from "react";
import { Select } from "@chakra-ui/react";

export interface SelectInputProps {
  onChange: (result: string) => void;
  value?: string;
  optionsMap: string[];
}

const SelectInput = ({
  onChange,
  value = "",
  optionsMap,
}: SelectInputProps): React.ReactElement => {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionsMap.map((options) => (
        <option key={options} value={options}>
          {options}
        </option>
      ))}
      ;
    </Select>
  );
};

export default SelectInput;
