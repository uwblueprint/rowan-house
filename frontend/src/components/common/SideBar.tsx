import React from "react";
import {
  Box,
  Flex,
  Square,
  Text,
  Center,
  Spacer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  Avatar, 
  AvatarBadge, 
  AvatarGroup, 
  Divider,
  Heading,
  Icon,
  Image
} from "@chakra-ui/react";

import { DownloadIcon, SunIcon } from "@chakra-ui/icons";

import RHSLogo from "../../assets/RHSlogo.png";




const Sidebar = (): React.ReactElement => {
  return (
    <Box w="20%">
      <Flex
        position="fixed"
        flex = "1"
        top="0"
        left="0"
        p="4px"
        w="280px"
        h="100%"
        minW="min-content"
        boxShadow="xl"
        flexFlow="column"
        flexDir="column"
        alignItems="center"
        bg = "brand.royal"
        color ="white"
        orientation = "vertical"
        justify="space=between"
      >
      
      <Flex>
        <Image
          src={RHSLogo}
          alt="Rowan House logo"
          width="150px"
          mx={16}
          my={8}
        />
      </Flex>
      
      <Flex 
      w="100"
      orientation = "vertical"
      flexDir = "column"
      pt="90px">

        <Flex
        w="100"
        h="62px"
        orientation = "horizontal"
        flexDir = "row"
        >
          <Icon as={SunIcon} w="24px" h="24px"/>
          <Text variant="body" pl = "20px">Manage Courses</Text>
        </Flex>

        <Flex
        w="100"
        h="62px"
        orientation = "horizontal"
        flexDir = "row"
        >   
          <Icon as={SunIcon} w="24px" h="24px"/>
          <Text variant="body" pl = "20px">Manage Users</Text>
        </Flex>
        
      </Flex>

      
      <Spacer/>
      <Flex
      p="0"
      w="100%"
      alignItems="inherit"
      orientation = "vertical"
      flexDir="column"
      >
 
        <Flex w="100%" pl="10px" pt="8px" pb="16px" pr="32px">
          <Avatar height="36px" width="36px"/>
          <Flex flexDir="column" w="100%" pl="24px">
            <Text variant = "caption" opacity="0.7"> Admin</Text>
            <Text variant= "body-bold">Jane Doe</Text>
          </Flex>
          <Icon as={DownloadIcon} w="24px" h="16px"/>
        </Flex>

      </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
