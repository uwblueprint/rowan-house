import React from "react";
import { Box, Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";

import ModuleOverview from "./SideBarModuleOverview";
import ContentKiosk from "./SideBarContentKiosk";

const EditorTabs = ({
  onLessonSelected,
}: {
  onLessonSelected: () => void;
}): React.ReactElement => (
  <Tabs variant="unstyled" height="100%" overflowY="hidden">
    <Box
      bg="background.light"
      borderRadius="md"
      p="6px"
      margin="auto"
      maxW="min-content"
      my="43px"
    >
      <TabList>
        <Tab
          style={{ paddingInline: "35px", height: "32px" }}
          _selected={{
            color: "white",
            bg: "brand.royal",
            borderRadius: "md",
          }}
        >
          Overview
        </Tab>
        <Tab
          style={{ paddingInline: "23px", height: "32px" }}
          _selected={{
            color: "white",
            bg: "brand.royal",
            borderRadius: "md",
          }}
        >
          Components
        </Tab>
      </TabList>
    </Box>
    <TabPanels height="100%" overflowY="hidden">
      <TabPanel
        p="0"
        pb="200px"
        height="100%"
        overflowY="auto"
        className="tabScroll"
      >
        <ModuleOverview editable onLessonSelected={onLessonSelected} />
      </TabPanel>
      <TabPanel pb="200px" height="100%" overflowY="auto" className="tabScroll">
        <ContentKiosk />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
export default EditorTabs;
