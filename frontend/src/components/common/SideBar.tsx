import React from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
<<<<<<< HEAD
  Image,
  Button
=======
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
>>>>>>> 17a017a (work in progress 13/03)
} from "@chakra-ui/react";

import { DownloadIcon, SunIcon } from "@chakra-ui/icons";

import RHSLogo from "../../assets/RHSlogo.png";




import CoursesIcon from "../../assets/Courses.svg";
import UsersIcon from "../../assets/Users.svg";
import RHSLogo from "../../assets/RHSLogo-white.png";



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
<<<<<<< HEAD
          />
=======
        />
>>>>>>> 17a017a (work in progress 13/03)
      </Flex>
      
      <Flex 
      w="100"
      orientation = "vertical"
      flexDir = "column"
<<<<<<< HEAD
      pt="72px">
=======
      pt="90px">
>>>>>>> 17a017a (work in progress 13/03)

        <Flex
        w="100"
        h="62px"
        orientation = "horizontal"
        flexDir = "row"
        >
<<<<<<< HEAD
          <Image
          src={CoursesIcon}
          alt="Book Icon"
          width="24px"
          height="24px"
          />
=======
          <Icon as={SunIcon} w="24px" h="24px"/>
>>>>>>> 17a017a (work in progress 13/03)
          <Text variant="body" pl = "20px">Manage Courses</Text>
        </Flex>

        <Flex
        w="100"
        h="62px"
        orientation = "horizontal"
        flexDir = "row"
        >   
<<<<<<< HEAD
          <Image
          src={UsersIcon}
          alt="Book Icon"
          width="24px"
          height="24px"
          />
=======
          <Icon as={SunIcon} w="24px" h="24px"/>
>>>>>>> 17a017a (work in progress 13/03)
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
<<<<<<< HEAD
=======
          <Avatar height="36px" width="36px"/>
>>>>>>> 17a017a (work in progress 13/03)
          <Flex flexDir="column" w="100%" pl="24px">
            <Text variant = "caption" opacity="0.7"> Admin</Text>
            <Text variant= "body-bold">Jane Doe</Text>
          </Flex>
<<<<<<< HEAD
          <Button variant="solid">
            <Text variant="button-sb" color="#2D3748">Sign Out</Text>
          </Button>
=======
          <Icon as={DownloadIcon} w="24px" h="16px"/>
>>>>>>> 17a017a (work in progress 13/03)
        </Flex>

      </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
