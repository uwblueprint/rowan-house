import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {
  Flex,
  Text,
  Image,
  FormControl,
  Link,
  Box,
  Button,
  VStack,
  Input,
  Center,
} from "@chakra-ui/react";
import logo from "../../assets/RHSlogo.png";
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

enum LoginState {
  EnterEmail,
  EnterPassword,
  ForgetPassword
}  


const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState,  setLoginState] = useState(LoginState.EnterEmail);
  const history = useHistory();

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const getLoginUser = async () => {
    const user: AuthenticatedUser = await authAPIClient.login(
      email,
      password,
      login,
    );
    setAuthenticatedUser(user);
  }

  const onLogInClick = async () => {
    switch (loginState) {
      case LoginState.EnterEmail:
        setLoginState(LoginState.EnterPassword);
        break;
      case LoginState.EnterPassword:
        getLoginUser();
        break;
      case LoginState.ForgetPassword:
        // implement send forget password link
        break;
      default:
        throw new Error("Unexpected login state");
    }
  };

  const onSignUpClick = () => {
    history.push(SIGNUP_PAGE);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  const getLoginForm = (currentLoginState: LoginState) => {
    switch (currentLoginState) {
      case LoginState.EnterEmail: 
        return (
          <Box>
            <Text variant="display-sm-sb">Sign in to access courses</Text>
            <FormControl>
            <Text variant="caption-md" marginTop="1.5rem">Email Address</Text>
              <Input
                type="email"
                value={email}
                placeholder="you@rowanhouse.ca"
                onChange={(event) => setEmail(event.target.value)}
                marginBottom="1rem"
              />
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2rem"
            >
              Continue
            </Button>
            <Center>
              Don&lsquo;t have an account?&nbsp;
              <Link
                color="purple"
                onClick={onSignUpClick}
                href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
              >
                Sign Up
              </Link>
            </Center>
          </Box>
        )
      case LoginState.EnterPassword: 
        return (
          <Box>
            <Text variant="display-sm-sb">Sign in to access courses</Text>
            <FormControl>
            <Text 
              variant="caption-md"
              marginTop="1.5rem"
              > Password</Text>
            <Input
              type="password"
              value={password}
              marginBottom="1rem"
              onChange={(event) => setPassword(event.target.value)}
            />
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2rem"
            >
              Login
            </Button>
            <Center>
              <Link
                alignItems="center"
                color="purple"
                onClick={onSignUpClick}
                href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
              >
                Forgot your password
              </Link>
            </Center>
          </Box>
        );
      case LoginState.ForgetPassword: 
        return (
          <Box>
            <Text variant="display-sm-sb">Forgot your password?</Text>
            <FormControl>
            <Text variant="caption-md" marginTop="1.5rem">Email Address</Text>
              <Input
                type="email"
                placeholder="you@rowanhouse.ca"
                onChange={(event) => setEmail(event.target.value)}
                marginBottom="1rem"
              />
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2rem"
            >
              Continue
            </Button>
            <Center>
              Remembered your password?{" "}
              <Link
                color="purple"
                onClick={onSignUpClick}
                href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
              >
                Sign in
              </Link>
            </Center>
          </Box>
        );
      default:
        throw new Error("Unexpected login state");
    }
  }

  return (
    <Flex>
      <Center flex="1">
        <VStack>
          <Image height="15%" marginBottom="0.5rem" src={logo} />
          {getLoginForm(loginState)}
        </VStack>
      </Center>
      <Box>
        <Image
          style={{
            height: "100vh",
          }}
          src={background}
        />
      </Box>
    </Flex>
  );
};

export default Login;
