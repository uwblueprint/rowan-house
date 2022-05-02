import React from "react";
import { Button, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { UserCardProps } from "../../types/AdminDashboardTypes";

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
  firstName,
  lastName,
  role,
  email,
  town,
}: UserCardProps): React.ReactElement => {
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
        <Button variant="outline-md">Edit Role</Button>
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
