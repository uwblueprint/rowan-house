import React from "react";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import ModuleOverview from "./SideBarModuleOverview";
import ContentKiosk from "./SideBarContentKiosk";

const Sidebar = (): React.ReactElement => {
  return (
    <Box w="20%">
      <Flex
        position="fixed"
        top="0"
        left="0"
        p="4"
        w="inherit"
        h="100%"
        minW="min-content"
        boxShadow="xl"
        flexFlow="column"
        alignItems="center"
      >
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Components</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ModuleOverview />
            </TabPanel>
            <TabPanel>
              <ContentKiosk />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default Sidebar;
