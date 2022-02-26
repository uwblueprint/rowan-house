import React from "react";
import { ContentType } from "../../types/ModuleEditorTypes";

import BlockPreview from "./BlockPreview";

const SideBarContentKiosk = (): React.ReactElement => {
  const options = [ContentType.text, ContentType.image];

  return (
    <div>
      {options.map((x, i) => (
        <BlockPreview type={x} key={i} />
      ))}
    </div>
  );
};

export default SideBarContentKiosk;
