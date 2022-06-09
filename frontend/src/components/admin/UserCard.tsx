import React, { useState } from "react";
import {
  Button,
  Flex,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { UserCardProps } from "../../types/AdminDashboardTypes";
import { Modal } from "../common/Modal";
import SelectInput from "../common/SelectInput";
import UPDATE_USER from "../../APIClients/mutations/UserMutations";
import {
  UserRequest,
  UserResponse,
} from "../../APIClients/types/UserClientTypes";

interface DefaultUserIconProps {
  initials: string;
}

const DefaultUserIcon = ({
  initials,
}: DefaultUserIconProps): React.ReactElement => {
  return (
    <Text
      h="145px"
      w="145px"
      lineHeight="145px"
      textAlign="center"
      bg="#DA7635"
      borderRadius="50%"
      color="white"
      fontSize="64px"
      fontWeight="medium"
    >
      {initials}
    </Text>
  );
};

const UserCard = ({
  id,
  firstName,
  lastName,
  role,
  email,
  town,
}: UserCardProps): React.ReactElement => {
  const userCardOptions = ["User", "Admin", "Staff"];
  const [selectValue, setSelectValue] = useState(userCardOptions[0]);
  const [currRole, setCurrRole] = useState(role);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateUser] = useMutation<{ updateUser: UserResponse }>(UPDATE_USER);

  const resetState = () => {
    setSelectValue(userCardOptions[0]);
  };

  const updateUserRender = async (userRole: string) => {
    const userInfo: UserRequest = {
      firstName,
      lastName,
      email,
      town,
      role: `${userRole}`,
    };
    const { data } = await updateUser({ variables: { id, user: userInfo } });
    if (data) {
      resetState();
      setCurrRole(userRole);
      onClose();
    } else {
      throw Error("Failed to update user role");
    }
  };

  const renderField = (fieldName: string, value: string) => {
    return (
      <VStack spacing={2} align="left">
        <Text variant="display-md">{fieldName}</Text>
        <Text variant="body">{value}</Text>
      </VStack>
    );
  };

  const getInitials = (first: string, last: string) =>
    first.charAt(0) + last.charAt(0).toUpperCase();

  return (
    <Flex
      pt={12}
      pb={16}
      border="1px"
      borderColor="background.lightgrey"
      borderRadius="6px"
    >
      <VStack align="center" spacing={8} ml="60px" mr="132px">
        <DefaultUserIcon initials={getInitials(firstName, lastName)} />
        <Button onClick={onOpen} variant="outline-md">
          Edit Role
        </Button>
        <Modal
          header="Edit user role"
          isOpen={isOpen}
          onConfirm={() => updateUserRender(selectValue)}
          onCancel={() => {
            resetState();
            onClose();
          }}
        >
          <SelectInput
            onChange={(currValue) => {
              setSelectValue(currValue);
            }}
            value={selectValue}
            optionsMap={userCardOptions}
          />
        </Modal>
      </VStack>
      <SimpleGrid
        templateColumns="repeat(auto-fit, 300px)"
        flex="1"
        spacingY={5}
      >
        {renderField("Name", `${firstName} ${lastName}`)}
        {renderField("Role", currRole)}
        {renderField("Email", email)}
        {renderField("Location", town)}
      </SimpleGrid>
    </Flex>
  );
};

export default UserCard;
