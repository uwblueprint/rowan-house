import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Flex, HStack, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { SmallAddIcon, SearchIcon } from "@chakra-ui/icons";
import { AdminPage, UserCardProps } from "../../types/AdminDashboardTypes";
import UserCard from "../admin/UserCard";
import SideBar from "../admin/SideBar";
import { UserResponse } from "../../APIClients/types/UserClientTypes";
import { USERS } from "../../APIClients/queries/UserQueries";

const NoUserSelectedCard = (): React.ReactElement => {
  return (
    <Box
      align="center"
      py={20}
      border="1px"
      borderColor="background.lightgrey"
      borderRadius="6px"
    >
      <SearchIcon h="100px" w="100px" color="text.grey"/>
      <Text variant="display-md">No User Selected</Text>
      <Text variant="body">
        Use the search bar above to view specific user details
      </Text>
    </Box>
  );
}

const ManageUsersPage = (): React.ReactElement => {
  const [searchEmail, setSearchEmail] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<UserCardProps | null>({
    firstName: "yes",
    lastName: "no",
    role: "User",
    email: "test@user.com",
    location: "Vancouver, BC",
  });
  
  // Never expose this
  const [users, setUsers] = useState<UserResponse[]>([]);

  // TODO manage access to this query and page
  useQuery<{
    users: Array<UserResponse>;
  }>(USERS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setUsers(data.users);
      console.log(users);
    },
  });

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
          <HStack spacing={9}>
            <Text variant="display-lg">
              Users
            </Text>
            <InputGroup w="500px">
              <Input
                value={searchEmail}
                placeholder="Search users by email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchEmail(event.target.value)}
              />
              <InputRightElement>
                <SearchIcon />
              </InputRightElement>
            </InputGroup>
          </HStack>
          <Button variant="md" leftIcon={<SmallAddIcon />}>
            Download Data
          </Button>
        </Flex>
        <Box px={9}>
          <Text variant="heading" mb={2}>User Information</Text>
          {
            selectedUser ?
              <UserCard
                firstName={selectedUser.firstName}
                lastName={selectedUser.lastName}
                role={selectedUser.role}
                email={selectedUser.email}
                location={selectedUser.location}
              />
              : <NoUserSelectedCard />
          }
        </Box>
      </Box>
    </Flex>
  );
};

export default ManageUsersPage;
