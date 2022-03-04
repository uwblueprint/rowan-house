import React from "react";
import { ContentType } from "../../types/ModuleEditorTypes";

import BlockPreview from "./BlockPreview";

const SideBarContentKiosk = (): React.ReactElement => {
  const options = [ContentType.TEXT, ContentType.IMAGE];

  return (
    <div>
      {options.map((option, index) => (
        <BlockPreview
          title={option.title}
          preview={option.preview}
          key={index}
        />
      ))}
    </div>
  );
};

export default SideBarContentKiosk;
