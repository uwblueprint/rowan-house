import React from "react";
import "./CheckBox.css";

interface CheckBoxParams {
  onClick: () => void;
  status: boolean;
  radio?: boolean;
}

const CheckBox = ({
  onClick,
  status = false,
  radio = false,
}: CheckBoxParams): React.ReactElement => {
  return (
    <div
      className="container"
      onClick={onClick}
    >
      <input type="checkbox" checked={status} onChange={() => {}} />
      <span
        className={`checkmark ${radio ? "rounded" : ""}`}
      />
    </div>
  );
};

export default CheckBox;
