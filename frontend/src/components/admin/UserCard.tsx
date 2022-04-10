import React from "react";
import { Box, Button, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { UserCardProps } from "../../types/AdminDashboardTypes";

const UserCard = ({
  firstName,
  lastName,
  role,
  email,
  town,
}: UserCardProps): React.ReactElement => {
  const renderField = (fieldName: string, value: string) => {
    return (
      <Box my={5}>
        <Text variant="display-md">{fieldName}</Text>
        <Text variant="body">{value}</Text>
      </Box>
    );
  };

  const renderDefaultUserIcon = (first: string, last: string) => {
    const initials = (first.charAt(0) + last.charAt(0)).toUpperCase();

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

  return (
    <Flex
      pt={12}
      pb={16}
      border="1px"
      borderColor="background.lightgrey"
      borderRadius="6px"
    >
      <VStack align="center" spacing={8} ml={15} mr={33}>
        {renderDefaultUserIcon(firstName, lastName)}
        <Button variant="outline-md">Edit Role</Button>
      </VStack>
      <SimpleGrid columns={[3, 2]} flex="1">
        {renderField("First Name", firstName)}
        {renderField("Last Name", lastName)}
        {renderField("Role", role)}
        {renderField("Email", email)}
        {renderField("Location", town)}
      </SimpleGrid>
    </Flex>
  );
};

export default UserCard;
