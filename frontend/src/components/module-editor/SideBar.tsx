import React, { useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  HStack,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";

import ModuleOverview from "./SideBarModuleOverview";
import ContentKiosk from "./SideBarContentKiosk";
import { ReactComponent as SaveIcon } from "../../assets/Save.svg";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import { ADMIN_DASHBOARD_PAGE } from "../../constants/Routes";
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
        <Box opacity="0.75" backgroundColor="black">
          <Box
            h="240px"
            backgroundPosition="center"
            backgroundImage={DEFAULT_IMAGE}
            backgroundSize="cover"
            bgRepeat="no-repeat"
            opacity="1"
            p={4}
          >
            <HStack justify="space-between">
              <Link href={ADMIN_DASHBOARD_PAGE}>
                <IconButton
                  aria-label="back"
                  icon={<ChevronLeftIcon />}
                  variant="unstyled"
                  color="white"
                  size="lg"
                />
              </Link>
              <IconButton
                aria-label="back"
                icon={<EditIcon />}
                variant="unstyled"
                color="white"
                size="lg"
              />
            </HStack>
            <Text variant="display-sm-sb" color="white">
              {state.course.title}
            </Text>
          </Box>
        </Box>
        <Tabs variant="unstyle">
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
            position="fixed"
            bottom="0"
            variant="unstyled"
            bg="#5FCA89"
            py="14px"
            color="white"
            leftIcon={<SaveIcon />}
            borderRadius="0"
            pl="35px"
            textAlign="left"
          >
            Save Changes
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
