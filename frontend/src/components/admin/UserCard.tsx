import React, { useState, useEffect } from "react";
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
import UPDATE_USER_ROLE from "../../APIClients/mutations/UserMutations";
import USER_ROLES from "../../constants/UserConstants";
import { Role } from "../../types/AuthTypes";

interface DefaultUserIconProps {
  initials: string;
}

const USER_INFO = [
  { label: USER_ROLES[0], value: USER_ROLES[0] },
  { label: USER_ROLES[1], value: USER_ROLES[1] },
  { label: USER_ROLES[2], value: USER_ROLES[2] },
];

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
  onUserSelect,
}: UserCardProps): React.ReactElement => {
  const [selectValue, setSelectValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSelectValue(role);
  }, [role]);

  const [UpdateUserRole] = useMutation(UPDATE_USER_ROLE);

  const resetState = (userRole: Role) => {
    setSelectValue(userRole);
  };

  const updateUserRender = async (userRole: Role) => {
    const { data } = await UpdateUserRole({ variables: { id, userRole } });
    if (data) {
      onUserSelect({
        id,
        firstName,
        lastName,
        email,
        town,
        role: userRole,
      });
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
            resetState(role);
            onClose();
          }}
        >
          <SelectInput
            onChange={setSelectValue}
            value={selectValue}
            optionsMap={USER_INFO}
          />
        </Modal>
      </VStack>
      <SimpleGrid
        templateColumns="repeat(auto-fit, 300px)"
        flex="1"
        spacingY={5}
      >
        {renderField("Name", `${firstName} ${lastName}`)}
        {renderField("Role", role)}
        {renderField("Email", email)}
        {renderField("Location", town)}
      </SimpleGrid>
    </Flex>
  );
};

export default UserCard;
