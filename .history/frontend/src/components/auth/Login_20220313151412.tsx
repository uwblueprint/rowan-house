import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Image,
  FormControl,
  FormLabel,
  Link,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import logo from "../logo.png";
import background from "../signuppage.png";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      town
      role
      accessToken
    }
  }
`;

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFirstPage, setIsFirstPage] = useState<boolean>(false);
  const history = useHistory();

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const onLogInClick = async () => {
    if (isFirstPage === false) {
      setIsFirstPage(true);
    } else if (isFirstPage === true) {
      const user: AuthenticatedUser = await authAPIClient.login(
        email,
        password,
        login,
      );
      setAuthenticatedUser(user);
    } else {
      throw new Error("invalid page number");
    }
  };

  const onSignUpClick = () => {
    history.push(SIGNUP_PAGE);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <SimpleGrid
      columns={[2, null, 3]} spacing='10px'
    >
    <Flex
      // backgroundColor="white"
      // justifyContent="center"
      // alignItems="center"
    >
      <Stack>
        <Box>
          <Image htmlHeight="5" src={logo} />
          <Heading>Sign in to access courses</Heading>
          <form>
            {isFirstPage ? (
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  placeholder="●●●●●"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
            ) : (
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="you@rowanhouse.ca"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
            )}
            <Button width="full" onClick={onLogInClick}>
              Continue
            </Button>
            {isFirstPage ? (
              <Link
                color="purple"
                onClick={onSignUpClick}
                href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
              >
                Forgot your password
              </Link>
            ) : (
              <Box>
                Don&lsquo;t have an account?{" "}
                <Link
                  color="purple"
                  onClick={onSignUpClick}
                  href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
                >
                  Sign Up
                </Link>
              </Box>
            )}
          </form>
        </Box>
        </Stack>
      </Flex>
      <Image
        style={{
          height: "100vh",
          // marginLeft: "40%",
        }}
        src={background}
        // resizeMode="stretch"
      />
    </SimpleGrid>
  );
};

export default Login;
