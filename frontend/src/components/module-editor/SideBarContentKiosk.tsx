import React from "react";
import { ContentType } from "../../types/ModuleEditorTypes";

import BlockPreview from "./BlockPreview";

const SideBarContentKiosk = (): React.ReactElement => {
  const options = [ContentType.text, ContentType.image];

  return (
    <div>
      {options.map((option, index) => (
        <BlockPreview type={option} key={index} />
      ))}
    </div>
  );
};

export default SideBarContentKiosk;
