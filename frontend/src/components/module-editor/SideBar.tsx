import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Link,
  HStack,
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
import { ADMIN_DASHBOARD_PAGE } from "../../constants/Routes";
import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleEditorParams } from "../../types/ModuleEditorTypes";

const Sidebar = (): React.ReactElement => {
  const { moduleIndex }: ModuleEditorParams = useParams();

  const context = useContext(EditorContext);

  if (!context) return <></>;
  const { state } = context;
  return (
    <Box w="20%" minW="300px">
      <Flex
        position="fixed"
        w="inherit"
        minW="300px"
        h="100vh"
        boxShadow="xl"
        flexFlow="column"
      >
        <Box opacity="0.9" backgroundColor="black">
          <Flex
            h="240px"
            backgroundPosition="center"
            backgroundImage={
              state.course.modules[Number(moduleIndex)].previewImage
            }
            backgroundSize="cover"
            bgRepeat="no-repeat"
            opacity="1"
            direction="column"
            justifyContent="space-between"
            p="35px"
          >
            <HStack justify="space-between">
              <Link href={ADMIN_DASHBOARD_PAGE}>
                <ChevronLeftIcon color="white" h={6} w={6} />
              </Link>
              <EditIcon color="white" h={5} w={5} />
            </HStack>
            <Text variant="display-sm-sb" color="white">
              {state.course.modules[Number(moduleIndex)].title}
            </Text>
          </Flex>
        </Box>
        <Tabs variant="unstyled">
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
            bg="#5FCA89"
            color="white"
            leftIcon={<SaveIcon />}
            borderRadius="0"
            pl="35px"
            minW="inherit"
            h="55px"
            justifyContent="left"
          >
            Save Changes
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
