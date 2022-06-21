import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Flex,
  Text,
  Image,
  FormControl,
  Box,
  Button,
  VStack,
  Input,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import RHSLogo from "../../assets/RHSlogo.png";
import BackgroundImage from "../../assets/signuppage.jpg";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { LOGIN } from "../../APIClients/mutations/AuthMutations";
import {
  MANAGE_COURSES_PAGE,
  SIGNUP_PAGE,
  VERIFY_EMAIL_PAGE,
} from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

enum LoginState {
  EnterEmail,
  EnterPassword,
  ForgetPassword,
}

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(LoginState.EnterEmail);
  const history = useHistory();

  const [login, { loading }] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const getLoginUser = async () => {
    const user: AuthenticatedUser = await authAPIClient.login(
      email,
      password,
      login,
    );
    setAuthenticatedUser(user);
  };

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
    switch (currentLoginState) {
      case LoginState.EnterPassword:
        return setLoginState(LoginState.EnterEmail);
      case LoginState.ForgetPassword:
        return setLoginState(LoginState.EnterPassword);
      default:
        throw new Error("Unexpected Error");
    }
  };

  // Temporarily while working on the admin side, should normally redirect to HOME_PAGE
  if (authenticatedUser) {
    return (
      <Redirect
        to={
          authenticatedUser?.emailVerified
            ? MANAGE_COURSES_PAGE
            : VERIFY_EMAIL_PAGE
        }
      />
    );
  }
  const getLoginForm = (currentLoginState: LoginState) => {
    switch (currentLoginState) {
      case LoginState.EnterEmail:
        return (
          <Box>
            <Text variant="display-sm-sb">Sign in to access courses</Text>
            <FormControl>
              <Text variant="caption-md" marginTop="4vh" marginBottom="1vh">
                Email Address
              </Text>
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
                color="brand.royal"
                onClick={onSignUpClick}
                textDecorationLine="underline"
              >
                Sign up
              </Button>
            </Center>
          </Box>
        );
      case LoginState.EnterPassword:
        return (
          <Box>
            <Text variant="display-sm-sb">Sign in to access courses</Text>
            <FormControl>
              <Box display="flex" marginTop="3vh">
                <Button onClick={() => onBackClick(loginState)} variant="link">
                  <ArrowBackIcon color="brand.royal" />
                  <Text variant="button" color="brand.royal">
                    Back
                  </Text>
                </Button>
              </Box>
              <Text variant="caption-md" marginTop="1.5vh" marginBottom="1vh">
                {" "}
                Password
              </Text>
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
              {loading ? <Spinner /> : "Login"}
            </Button>
            <Center>
              <Button
                variant="link"
                color="brand.royal"
                onClick={() => setLoginState(LoginState.ForgetPassword)}
                textDecorationLine="underline"
              >
                Forgot your password?
              </Button>
            </Center>
          </Box>
        );
      case LoginState.ForgetPassword:
        return (
          <Box>
            <Text variant="display-sm-sb">Forgot your password?</Text>
            <Box display="flex" marginTop="3vh">
              <Button onClick={() => onBackClick(loginState)} variant="link">
                <ArrowBackIcon color="brand.royal" />
                <Text variant="button" color="brand.royal">
                  Back
                </Text>
              </Button>
            </Box>
            <FormControl>
              <Text variant="caption-md" marginTop="1.5vh" marginBottom="1vh">
                Email Address
              </Text>
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
              Remembered your password?&nbsp;
              <Button
                variant="link"
                color="brand.royal"
                textDecorationLine="underline"
                onClick={() => setLoginState(LoginState.EnterEmail)}
              >
                Sign in
              </Button>
            </Center>
          </Box>
        );
      default:
        throw new Error("Unexpected login state");
    }
  };

  return (
    <Flex minH="100vh">
      <Center flex="1">
        <VStack>
          <Image height="13vh" marginBottom="2.5vh" src={RHSLogo} />
          {getLoginForm(loginState)}
        </VStack>
      </Center>
      <Image width="50vw" objectFit="cover" src={BackgroundImage} />
    </Flex>
  );
};

export default Login;
