import React from "react";
import { ModuleProps } from "../../types/ModuleEditorTypes";
import ModuleOverview from "./SideBarModuleOverview";
import ContentKiosk from "./SideBarContentKiosk";

type SideBarProps = {
  module: ModuleProps;
};

const SideBar = ({ module }: SideBarProps): React.ReactElement => {
  return (
    <div>
      <ModuleOverview module={module} />
      <ContentKiosk />
    </div>
  );
};

export default SideBar;
