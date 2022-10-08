import React from "react";
import "./CheckBox.css";

export interface CheckBoxStyleParams {
  size?: string;
  selectedColor?: string;
  unselectedColor?: string;
  disabled?: boolean;
}

interface CheckBoxParams extends CheckBoxStyleParams {
  onClick: () => void;
  isSelected: boolean;
  radio?: boolean;
}

const CheckBox = ({
  onClick,
  isSelected = false,
  radio = false,
  size = "22px",
  selectedColor = "#94D969",
  unselectedColor = "#ddd",
  disabled = false,
}: CheckBoxParams): React.ReactElement => {
  return (
    <div className="container" onClick={disabled ? undefined : onClick}>
      <input type="checkbox" checked={isSelected} onChange={() => {}} />
      <span
        style={{
          height: size,
          width: size,
          backgroundColor: isSelected ? selectedColor : unselectedColor,
        }}
        className={`checkmark ${radio ? "rounded" : ""}`}
      />
    </div>
  );
};

export default CheckBox;
