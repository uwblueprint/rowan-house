import React from "react";
<<<<<<< HEAD
import { Box, Flex, Text, Spacer, Image, Button } from "@chakra-ui/react";

import CoursesIcon from "../../assets/Courses.svg";
import UsersIcon from "../../assets/Users.svg";
import RHSLogo from "../../assets/RHSLogo-white.png";

interface TabProps {
    icon:string
    text:string
}

function Tab({icon, text}:TabProps) {
   return(
    <Flex padding="1rem 2rem">
      <Image
        src={icon}
        alt={text}
        width="1.5rem"
        height="1.5rem"
        />
      <Text variant="body" pl="1.5rem">
        {text}
      </Text>
    </Flex>
   )
 }
=======
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

<<<<<<< HEAD
>>>>>>> 15ec4b8 (Landing Page: Navigation Sidebar)
=======
import { DownloadIcon, SunIcon } from "@chakra-ui/icons";

import RHSLogo from "../../assets/RHSlogo.png";



>>>>>>> 17a017a (work in progress 13/03)

const Sidebar = (): React.ReactElement => {
  return (
    <Box w="20%">
      <Flex
        position="fixed"
<<<<<<< HEAD
        flex="1"
        p="0.25px"
        w="20%"
        h="100%"
        minW="min-content"
        flexFlow="column"
        align="center"
        bg="brand.royal"
        color="white"
        justify="space=between"
      >
        <Flex>
          <Image
            src={RHSLogo}
            alt="Rowan House logo"
            width="10rem"
            pt="2rem"
          />
        </Flex>
        <Flex w="100%" flexDir="column" pt="72px">
          <Tab icon={CoursesIcon} text="Manage Courses"/>
          <Tab icon={UsersIcon} text="Manage Users"/>
        </Flex>
        <Spacer />
        <Flex
        w="100%"
        justify="space-between"
        p="1.5rem"
      >
           <Flex flexDir="column">
            <Text variant="caption" opacity="0.7"> Admin</Text>
            <Text variant="body-bold">Jane Doe</Text>
          </Flex>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Button variant="secondary-filled">Sign Out</Button>
=======
=======
>>>>>>> 3ad9d03 (Landing Page: Navigation Sidebar)
<<<<<<< HEAD
=======
>>>>>>> 74418b1 (Rebased)
          <Button variant="solid">
            <Text variant="button-sb" color="#2D3748">Sign Out</Text>
          </Button>
        </Flex>

>>>>>>> b0e2334 (Sidebar with images)
=======
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

>>>>>>> 15ec4b8 (Landing Page: Navigation Sidebar)
      </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
