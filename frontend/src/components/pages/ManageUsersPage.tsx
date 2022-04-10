import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DownloadIcon, SearchIcon } from "@chakra-ui/icons";
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
      <SearchIcon h="100px" w="100px" color="text.grey" />
      <Text variant="display-md">No User Selected</Text>
      <Text variant="body">
        Use the search bar above to view specific user details
      </Text>
    </Box>
  );
};

interface UsersByEmail {
  [email: string]: UserResponse;
}

const ManageUsersPage = (): React.ReactElement => {
  const [searchEmail, setSearchEmail] = useState<string>("");

  const { isOpen, onClose } = useDisclosure();
  const [selectableUserName, setSelectableUserName] = useState<string | null>();

  const [selectedUser, setSelectedUser] = useState<UserCardProps | null>();

  // Never expose this
  const [users, setUsers] = useState<UsersByEmail>({});

  // TODO manage access to this query and page
  useQuery<{
    users: Array<UserResponse>;
  }>(USERS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const userProfiles = data.users.reduce(
        (map: UsersByEmail, user: UserResponse) => {
          // eslint-disable-next-line no-param-reassign
          map[user.email] = user;
          return map;
        },
        {},
      );

      setUsers(userProfiles);
    },
  });

  const getUserResultOrNull = (email: string): string | null =>
    email in users
      ? `${users[email].firstName} ${users[email].lastName}`
      : null;

  const handleSearchSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSelectableUserName(getUserResultOrNull(searchEmail));
  };

  const handleOnSelectUser = () => {
    setSelectedUser(users[searchEmail]);
    setSelectableUserName(null);
    setSearchEmail("");
  };

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
            <Menu isOpen={searchEmail !== ""}>
              <MenuButton tabIndex={-1} />
              <InputGroup w="500px">
                <Input
                  value={searchEmail}
                  placeholder="Search users by email"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.target;
                    setSelectableUserName(getUserResultOrNull(value));
                    setSearchEmail(value);
                  }}
                  onSubmit={handleSearchSubmit}
                />
                <InputRightElement as="button" onClick={handleSearchSubmit}>
                  <SearchIcon />
                </InputRightElement>
              </InputGroup>
              <MenuList
                w="500px"
                bg="#F0F1F2"
                p={0}
                m={2}
                borderRadius="6px"
                boxShadow="0px 8px 20px rgba(0, 0, 0, 0.15), 0px 0px 1px rgba(0, 0, 0, 0.9)"
              >
                {selectableUserName ? (
                  <MenuItem pl={7} py={2} onClick={handleOnSelectUser}>
                    {selectableUserName}
                  </MenuItem>
                ) : (
                  <MenuItem isDisabled>No user found</MenuItem>
                )}
              </MenuList>
            </Menu>
          </HStack>
          <Button variant="md" leftIcon={<DownloadIcon />}>
            Download Data
          </Button>
        </Flex>
        <Box px={9}>
          <Text variant="heading" mb={2}>
            User Information
          </Text>
          {selectedUser ? (
            <UserCard
              firstName={selectedUser.firstName}
              lastName={selectedUser.lastName}
              role={selectedUser.role}
              email={selectedUser.email}
              town={selectedUser.town}
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
