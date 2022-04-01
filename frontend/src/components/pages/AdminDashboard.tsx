import React from "react";
import { Flex } from "@chakra-ui/react";
import SideBar from "../admin/SideBar";
import CoursesOverviewTab from "../admin/CoursesOverviewTab";

const AdminDashboard = (): React.ReactElement => {
  return (
    <Flex>
      <SideBar />
      <CoursesOverviewTab />
    </Flex>
  );
};

export default AdminDashboard;
