import React from "react";
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

const Sidebar = (): React.ReactElement => {
  return (
    <Box w="20%">
      <Flex
        position="fixed"
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
          <Button variant="secondary-filled">Sign Out</Button>
=======
<<<<<<< HEAD
          <Button variant="solid">
            <Text variant="button-sb" color="#2D3748">Sign Out</Text>
          </Button>
=======
          {/* <Icon as={DownloadIcon} w="24px" h="16px"/> */}
          <IconButton
          variant='ghost'
          colorScheme='white'
          aria-label='Log out'
          icon={<DownloadIcon />}
          />
>>>>>>> 9290b0b (Sidebar with images)
        </Flex>

>>>>>>> b0e2334 (Sidebar with images)
      </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
