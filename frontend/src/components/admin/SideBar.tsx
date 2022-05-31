import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Text, Image, Button } from "@chakra-ui/react";
import { ReactComponent as CoursesIcon } from "../../assets/Courses.svg";
import { ReactComponent as UsersIcon } from "../../assets/Users.svg";
import RHSLogo from "../../assets/RHSLogo-white.png";
import { AdminPage, SidebarProps } from "../../types/AdminDashboardTypes";
import { MANAGE_COURSES_PAGE, MANAGE_USERS_PAGE } from "../../constants/Routes";

interface PageTabProps {
  pageName: string;
  bgColor: string;
  icon: React.ReactElement;
  onClickTab: () => void;
}

const PageTab = ({
  pageName,
  bgColor,
  icon,
  onClickTab,
}: PageTabProps): React.ReactElement => {
  return (
    <Button
      isFullWidth
      h="auto"
      iconSpacing={5}
      justifyContent="flex-start"
      boxShadow="0px"
      bg={bgColor}
      pl={7}
      py={4}
      m={0}
      borderRadius="0px"
      leftIcon={icon}
      onClick={onClickTab}
    >
      <Text variant="body" h="min-content">
        {pageName}
      </Text>
    </Button>
  );
};

const Sidebar = ({ currentPage }: SidebarProps): React.ReactElement => {
  const history = useHistory();


  const getTabColor = (tab: AdminPage) =>
    tab === currentPage ? "brand.purple" : "brand.royal";

  const setNewPage = (newTab: AdminPage) => {
    if (newTab !== currentPage) {
      switch (newTab) {
        case AdminPage.ManageCourses:
          history.push(MANAGE_COURSES_PAGE);
          break;
        case AdminPage.ManageUsers:
          history.push(MANAGE_USERS_PAGE);
          break;
        default:
          throw new Error("Unexpected admin dashboard page");
      }
    }
  };

  return (
    <Flex w="20%">
      <Flex
        position="fixed"
        w="inherit"
        h="100vh"
        minW="min-content"
        flexFlow="column"
        align="center"
        bg="brand.royal"
        color="white"
      >
        <Image src={RHSLogo} alt="Rowan House logo" w="10rem" pt="2rem" />
        <Flex w="100%" flexDir="column" pt="4.5rem" flex="1">
          <PageTab
            pageName="Manage Courses"
            bgColor={getTabColor(AdminPage.ManageCourses)}
            icon={<CoursesIcon />}
            onClickTab={() => setNewPage(AdminPage.ManageCourses)}
          />
          <PageTab
            pageName="Manage Users"
            bgColor={getTabColor(AdminPage.ManageUsers)}
            icon={<UsersIcon />}
            onClickTab={() => setNewPage(AdminPage.ManageUsers)}
          />
        </Flex>
        <Flex w="100%" justify="space-between" p="1.5rem" align="center">
          <Flex flexDir="column">
            <Text variant="caption" opacity="0.7">
              Admin
            </Text>
            <Text variant="body-bold">Jane Doe</Text>
          </Flex>
          <Button variant="secondary-filled">Sign out</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
