
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
  const [isSecondPage, setIsSecondPage] = useState<boolean>(false);
  const history = useHistory();

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  
  const onLogInClick = async () => {
    if (isSecondPage === false) {
      setIsSecondPage(true);
    } else if (isSecondPage === true) {
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
    <Flex>
      <Center flex="1">
        <VStack>
          <Image height="13vh" marginBottom="0.5rem" src={logo} />
          {
  
  switch(loginState){
    case LoginState.EnterEmail: 
      return (
        <Text variant="display-sm-sb">Sign in to access courses</Text>
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
      );

    case LoginState.EnterPassword: 
      return(
        <Text variant="display-sm-sb">Sign in to access courses</Text>
              <FormControl>
              <Text 
                variant="caption-md"
                marginTop="1.5rem"
                > Password</Text>
              <Input
                type="password"
                placeholder="●●●●●"
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
              <Link
                color="purple"
                onClick={onSignUpClick}
                href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
              >
                Forgot your password
              </Link>
            );

          case LoginState.ForgetPassword: 
            return(
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
              <Box>
                Remembered your password?{" "}
                <Link
                  color="purple"
                  onClick={onSignUpClick}
                  href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
                >
                  Sign in
                </Link>
              </Box>
            );
  }
}
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
