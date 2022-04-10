import React, { useRef, useState } from "react";
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

const SearchUsersBar = ({
  users,
  onUserSelect,
}: SearchUsersBarProps): React.ReactElement => {
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [showNewResult, setShowNewResult] = useState<boolean>(false);

  const handleOnSelectUser = () => {
    onUserSelect(searchEmail);
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
          value={searchEmail}
          placeholder="Search users by email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchEmail(event.target.value);
            setShowNewResult(true);
          }}
          onFocus={() => setShowNewResult(true)}
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
        {searchEmail in users ? (
          <MenuItem
            pl={7}
            py={2}
            borderRadius="6px"
            _hover={{ borderRadius: "6px" }}
            onClick={handleOnSelectUser}
          >
            {`${users[searchEmail].firstName} ${users[searchEmail].lastName}`}
          </MenuItem>
        ) : (
          <MenuItem isDisabled>No user found</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default SearchUsersBar;
