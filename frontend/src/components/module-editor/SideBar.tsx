import React, { useContext } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import ModuleOverview from "./SideBarModuleOverview";
import ContentKiosk from "./SideBarContentKiosk";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import EditorContext from "../../contexts/ModuleEditorContext";

const Sidebar = (): React.ReactElement => {
  const context = useContext(EditorContext);

  if (!context) return <></>;
  const { state } = context;

  // const { lessons, course, focusedLesson } = state;
  return (
    <Box w="20%" minW="min-content">
      <Flex
        position="fixed"
        w="inherit"
        h="100vh"
        boxShadow="xl"
        flexFlow="column"
      >
        <Box>
          <AspectRatio ratio={4 / 3}>
            <Image objectFit="cover" src={DEFAULT_IMAGE} />
          </AspectRatio>
        </Box>
        <Tabs variant="unstyle" h="100%">
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
                style={{ paddingInline: "35px" }}
                _selected={{
                  color: "white",
                  bg: "brand.royal",
                  borderRadius: "md",
                }}
              >
                Overview
              </Tab>
              <Tab
                style={{ paddingInline: "23px" }}
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
          <TabPanels>
            <TabPanel p="0">
              <ModuleOverview />
            </TabPanel>
            <TabPanel>
              <ContentKiosk />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {state.hasChanged && (
          <Button
            variant="unstyled"
            bg="#5FCA89"
            py="14px"
            leftIcon={<CheckIcon />}
            borderRadius="0"
            pl="35px"
            textAlign="left"
            color="white"
          >
            Save Changes
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
