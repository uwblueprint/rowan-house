import React from "react";
import CoursePreview from "./CoursePreview";

import { CoursePreviewProps } from "../../types/AdminDashboardTypes"

const CoursesOverviewTab = (): React.ReactElement => {
  const dummyCourses: Array<CoursePreviewProps> = [{
    title: "Hello!",
    description: "I am a course",
    isPrivate: false,
    modules: [
      {
        title: "Module 1",
        description: "Test1",
        published: true
      },
      {
        title: "Module 2",
        description: "Test2",
        published: true
      },
      {
        title: "Module 3",
        description: "Test3",
        published: true
      }
    ]
  }]

  return (
    <div>
      {
        dummyCourses.map((x, i) => 
          <CoursePreview key={i}
            title={x.title}
            description={x.description}
            isPrivate={x.isPrivate}
            modules={x.modules}
          />
        )
      }
    </div>
  );
};

export default CoursesOverviewTab;
