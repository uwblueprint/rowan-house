import React from "react";
import SideBar from "../common/SideBar"
import CoursesOverviewTab from "../admin/CoursesOverviewTab"
import ManageTab from "../admin/ManageTab"

const AdminDashboard = (): React.ReactElement => {
  return (
    <div>
      <SideBar/>
      <CoursesOverviewTab/>
      <ManageTab/>
    </div>
  );
};

export default AdminDashboard;
