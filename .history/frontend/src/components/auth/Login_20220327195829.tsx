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
import { ArrowBackIcon } from '@chakra-ui/icons';
import RHSLogo from "../../assets/RHSlogo.png";
import BackgroundImage from "../signuppage.png";

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

  const onBackClick = (currentLoginState: LoginState) => {
    if (currentLoginState = LoginState.EnterPassword) {
      setLoginState(LoginState.EnterEmail)
    }
    else if (currentLoginState = LoginState.ForgetPassword) {
      setLoginState(LoginState.EnterPassword)
    }
    else {
      throw new Error("Unexpected Error");
    }
  }

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
            <Text variant="caption-md" marginTop="4vh">Email Address</Text>
              <Input
                type="email"
                value={email}
                placeholder="you@rowanhouse.ca"
                onChange={(event) => setEmail(event.target.value)}
                marginBottom="3vh"
              />
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2vh"
            >
              Continue
            </Button>
            <Center>
              Don&lsquo;t have an account?&nbsp;
              <Button
                variant="link"
                color="purple"
                onClick={onSignUpClick}
              >
                Sign Up
              </Button>
            </Center>
          </Box>
        )
      case LoginState.EnterPassword: 
        return (
          <Box>
            <Text variant="display-sm-sb">Sign in to access courses</Text>
            <FormControl>
            <Box 
              display="flex"
              marginTop="3vh"
              >
              <Button
                onClick={onBackClick(LoginState.EnterPassword)}
                variant="link"
                >
                <ArrowBackIcon />
                <Text variant="button">Back</Text>
              </Button>
            </Box>
            <Text variant="caption-md" marginTop="1.5vh"> Password</Text>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              marginBottom="3vh"
            />
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2vh"
            >
              Login
            </Button>
            <Center>
              <Button
                variant="link"
                color="purple"
                onClick={onSignUpClick}
              >
                Forgot your password
              </Button>
            </Center>
          </Box>
        );
      case LoginState.ForgetPassword: 
        return (
          <Box>
            <Text variant="display-sm-sb">Forgot your password?</Text>
            <Box 
              display="flex"
              marginTop="3vh"
              >
              <Button
                onClick={onBackClick(LoginState.ForgetPassword)}
                variant="link"
                >
                <ArrowBackIcon />
                <Text variant="button">Back</Text>
              </Button>
            </Box>
            <FormControl>
            <Text variant="caption-md" marginTop="1.5vh">Email Address</Text>
              <Input
                type="email"
                placeholder="you@rowanhouse.ca"
                onChange={(event) => setEmail(event.target.value)}
                marginBottom="3vh"
              />
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2vh"
            >
              Continue
            </Button>
            <Center>
              Remembered your password?{" "}
              <Button
                variant="sm"
                color="purple"
                onClick={onSignUpClick}
              >
                Sign in
              </Button>
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
          <Image height="13vh" marginBottom="2.5vh" src={RHSLogo} />
          {getLoginForm(loginState)}
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

export default Login;
