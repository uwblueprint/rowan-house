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
  Heading
} from "@chakra-ui/react";


const Sidebar = (): React.ReactElement => {
  return (
    <Box w="20%">
      <Flex
        position="fixed"
        flex = "1"
        top="0"
        left="0"
        p="4"
        w="20%"
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

      <Flex w="100">
        <Text>for options</Text>
      </Flex>

      

      <Flex
      p="0"
      w="100%"
      alignItems="inherit"
      orientation = "horizontal"
      flexDir="row"
      >
        <Divider />
        <Flex w="100%">
          <Avatar height="36px" width="36px"/>
          <Flex flexDir="column" w="100%">
            <Text variant> Admin</Text>
            <Heading>Jane Doe</Heading>
          </Flex>
          
        </Flex>

      </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
