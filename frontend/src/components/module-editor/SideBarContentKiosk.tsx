import React from "react";
import { ContentTypeEnum } from "../../types/ModuleEditorTypes";

import BlockPreview from "./BlockPreview";

const SideBarContentKiosk = (): React.ReactElement => {
  const options = [ContentTypeEnum.TEXT, ContentTypeEnum.IMAGE];

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
