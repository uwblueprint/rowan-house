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
  Box
} from "@chakra-ui/react";
import logo from '../logo.png';
import background from '../signuppage.png';

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
  const history = useHistory();

  const [login] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const onLogInClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.login(
      email,
      password,
      login,
    );
    setAuthenticatedUser(user);
  };

  const onSignUpClick = () => {
    history.push(SIGNUP_PAGE);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <Flex
      width="100wh"
      height="100vh"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center">
      <Stack>
        <Box>
        <Link 
            color="purple" 
            justifyContent="left"
            onClick={onSignUpClick}
            href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
            >
            Back
        </Link>
        <Image htmlHeight='5' src={logo}/>
        <Heading>Sign in to access courses</Heading>
        <form>
          <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input 
              type="password" 
              placeholder="●●●●●"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              />
          </FormControl>
          <Button
                  borderRadius={1}
                  type="submit"
                  variant="solid"
                  colorScheme= "purple"
                  width="full"
                  onClick={onLogInClick}
                >
                  Continue
          </Button>
        </form>
          <Link 
            color="purple" 
            onClick={onSignUpClick}
            href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
            >
            Forgot your password
          </Link>
        </Box>
      </Stack>
      <Image
        style={{
          height: '100%',
          width: '50%',
        }}
        src={background}
        resizeMode="stretch"
      />
    </Flex>
  );
};

export default Login;
