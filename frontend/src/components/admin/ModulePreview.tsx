import React from "react";
import { ModulePreviewProps } from "../../types/AdminDashboardTypes";

const ModulePreview = ({
  title,
  description,
  published,
}: ModulePreviewProps): React.ReactElement => {
  return (
    <div>
      Module Preview
      {title}
      {description}
      Published: {published}
    </div>
  );
};

export default ModulePreview;
