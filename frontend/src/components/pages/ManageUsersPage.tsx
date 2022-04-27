import React, { useState } from "react";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { DownloadIcon, SearchIcon } from "@chakra-ui/icons";
import { AdminPage, UserCardProps } from "../../types/AdminDashboardTypes";
import UserCard from "../admin/UserCard";
import SideBar from "../admin/SideBar";
import SearchUsersBar from "../admin/SearchUsersBar";

const NoUserSelectedCard = (): React.ReactElement => {
  return (
    <Box
      align="center"
      py={20}
      border="1px"
      borderColor="background.lightgrey"
      borderRadius="6px"
    >
      <SearchIcon h="100px" w="100px" color="text.grey" />
      <Text variant="display-md">No User Selected</Text>
      <Text variant="body">
        Use the search bar above to view specific user details
      </Text>
    </Box>
  );
};

const ManageUsersPage = (): React.ReactElement => {
  const [
    spotlightedUser,
    setSpotlightedUser,
  ] = useState<UserCardProps | null>();

  return (
    <Flex h="100vh">
      <SideBar currentPage={AdminPage.ManageUsers} />
      <Box flex="1">
        <Flex
          my={6}
          // px instead of mx to extend border completely in container
          px={9}
          pb={6}
          justify="space-between"
          borderBottom="1px"
          borderColor="background.lightgrey"
        >
          <HStack>
            <Text variant="display-lg" mr={9}>
              Users
            </Text>
            <SearchUsersBar
              onUserSelect={(user: UserCardProps) => setSpotlightedUser(user)}
            />
          </HStack>
          <Button variant="md" leftIcon={<DownloadIcon />}>
            Download Data
          </Button>
        </Flex>
        <Box px={9}>
          <Text variant="heading" mb={2}>
            User Information
          </Text>
          {spotlightedUser ? (
            <UserCard
              id={spotlightedUser.id}
              firstName={spotlightedUser.firstName}
              lastName={spotlightedUser.lastName}
              role={spotlightedUser.role}
              email={spotlightedUser.email}
              town={spotlightedUser.town}
            />
          ) : (
            <NoUserSelectedCard />
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default ManageUsersPage;
