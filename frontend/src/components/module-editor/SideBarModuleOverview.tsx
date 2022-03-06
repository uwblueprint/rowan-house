import React from "react";
import { ModuleProps } from "../../types/ModuleEditorTypes";

const SideBarModuleOverview = ({
  module,
}: {
  module: ModuleProps;
}): React.ReactElement => {
  return (
    <div>
      {module.title}
      {module.description}
    </div>
  );
};

export default SideBarModuleOverview;
