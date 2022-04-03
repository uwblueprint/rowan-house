import React, { useContext, useState } from "react";
import { Redirect, useHistory} from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Input, FormControl, Text, Button, Center, Box, Flex, VStack, Image } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { REGISTER } from "../../APIClients/mutations/AuthMutations";
import { HOME_PAGE, LOGIN_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import RHSLogo from "../../assets/RHSlogo.png";
import BackgroundImage from "../signuppage.png";

const Signup = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [register] = useMutation<{ register: AuthenticatedUser }>(REGISTER);

  const onSignupClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.register(
      firstName,
      lastName,
      email,
      town,
      password,
      register,
    );
    setAuthenticatedUser(user);
  };

  const onSignInClick = () => {
    history.push(LOGIN_PAGE);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <Flex>
    <Center flex="1">
      <VStack marginLeft="30vh" marginRight="30vh">
        <Image height="13vh" marginBottom="2.5vh" marginTop="2.5vh" src={RHSLogo} />
        <Box>
          <Center><Text variant="display-sm-sb">Sign up for courses</Text> </Center>
          <FormControl>
          <Text variant="caption-md" marginTop="4vh" marginBottom="1vh">Name</Text>
          <Box display="flex">
            <Input
              type="text"
              placeholder="First"
              value={firstName}
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setFirstName(event.currentTarget.value)}
              marginBottom="2vh"
              marginRight="1vh"
            />
            <Input
              type="text"
              placeholder="Last"
              value={lastName}
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setLastName(event.currentTarget.value)}
              marginBottom="2vh"
            />
          </Box>
          <Text variant="caption-md" marginBottom="1vh">Email Address</Text>
            <Input
              type="email"
              value={email}
              placeholder="you@rowanhouse.ca"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setEmail(event.currentTarget.value)}
              marginBottom="2vh"
            />
          <Text variant="caption-md" marginBottom="1vh">City/Town</Text>
            <Input
              type="text"
              value={town}
              placeholder="Shaughnessy"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setTown(event.currentTarget.value)}
              marginBottom="2vh"
            />
          <Text variant="caption-md" marginBottom="1vh">Password</Text>
            <Input
              type="password"
              value={password}
              placeholder="●●●●●●●●"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setPassword(event.currentTarget.value)}
              marginBottom="2vh"
            />
          <Text variant="caption-md" marginBottom="1vh">Confirm Password</Text>
            <Input
              type="password"
              value={password}
              placeholder="●●●●●●●●"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setPassword(event.currentTarget.value)}
              marginBottom="2vh"
            />
          </FormControl>
          <Button
            variant="sm"
            width="full"
            onClick={onSignupClick}
            marginBottom="2vh"
          >
            Sign Up
          </Button>
          <Center>
            Have an account?&nbsp;
            <Button
              variant="link"
              color="purple"
              onClick={onSignInClick}
              textDecorationLine="underline"
            >
              Sign In
            </Button>
          </Center>
        </Box>
      </VStack>
      </Center>
      <Box>
        <Image
          height="100vh"
          src={BackgroundImage}
        />
      </Box>
    </Flex>
  );
};

export default Signup;