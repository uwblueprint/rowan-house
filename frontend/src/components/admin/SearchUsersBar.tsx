import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchUsersBarProps } from "../../types/AdminDashboardTypes";
import { UserResponse } from "../../APIClients/types/UserClientTypes";
import { GET_USER_BY_EMAIL } from "../../APIClients/queries/UserQueries";

const SearchUsersBar = ({
  onUserSelect,
}: SearchUsersBarProps): React.ReactElement => {
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [showNewResult, setShowNewResult] = useState<boolean>(false);
  const [getSearchResult, { loading, data }] = useLazyQuery<{
    user: UserResponse;
  }>(GET_USER_BY_EMAIL, { fetchPolicy: "cache-and-network" });

  const getNoResultMessage = () => (loading ? "Loading..." : "No user found");

  const handleOnSelectUser = () => {
    if (!data) return;
    const { user } = data;

    onUserSelect({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      town: user.town,
      role: user.role,
      email: user.email,
    });
    setSearchEmail("");
  };

  return (
    <Menu
      isOpen={searchEmail !== "" && showNewResult}
      offset={[8, 20]}
      onClose={() => setShowNewResult(false)}
    >
      <MenuButton tabIndex={-1} />
      <InputGroup w="500px">
        <Input
          type="email"
          value={searchEmail}
          placeholder="Search users by email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchEmail(event.target.value);
            getSearchResult({ variables: { email: event.target.value } });
            setShowNewResult(true);
          }}
          onFocus={() => setShowNewResult(true)}
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && data) {
              handleOnSelectUser();
            }
          }}
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <MenuList
        w="500px"
        bg="#F0F1F2"
        p={0}
        borderRadius="6px"
        boxShadow="0px 8px 20px rgba(0, 0, 0, 0.15), 0px 0px 1px rgba(0, 0, 0, 0.9)"
      >
        {data ? (
          <MenuItem
            pl={7}
            py={2}
            borderRadius="6px"
            _hover={{ borderRadius: "6px" }}
            onClick={handleOnSelectUser}
          >
            {`${data.user.firstName} ${data.user.lastName}`}
          </MenuItem>
        ) : (
          <MenuItem isDisabled>{getNoResultMessage()}</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default SearchUsersBar;
