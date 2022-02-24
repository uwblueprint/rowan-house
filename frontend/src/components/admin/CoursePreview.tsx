import React from "react";
import ModulePreview from "./ModulePreview";
import { CoursePreviewProps } from "../../types/AdminDashboardTypes";

const CoursePreview = ({
  title,
  description,
  isPrivate,
  modules,
}: CoursePreviewProps): React.ReactElement => {
  return (
    <div>
      Course Preview
      {title}
      {description}
      {isPrivate}
      {modules.map((x, i) => (
        <ModulePreview
          key={i}
          title={x.title}
          description={x.description}
          published={x.published}
        />
      ))}
    </div>
  );
};

export default CoursePreview;
