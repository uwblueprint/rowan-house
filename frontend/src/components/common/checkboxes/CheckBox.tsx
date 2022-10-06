import React from "react";
import "./CheckBox.css";

interface CheckBoxParams {
  onClick: () => void;
  status: boolean;
  radio?: boolean;
  size?: string;
}

const CheckBox = ({
  onClick,
  status = false,
  radio = false,
  size = "22px",
}: CheckBoxParams): React.ReactElement => {
  return (
    <div className="container" onClick={onClick}>
      <input type="checkbox" checked={status} onChange={() => {}} />
      <span
        style={{
          height: size,
          width: size,
        }}
        className={`checkmark ${radio ? "rounded" : ""}`}
      />
    </div>
  );
};

export default CheckBox;
