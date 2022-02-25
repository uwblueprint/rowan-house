import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
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
import { LOGIN } from "../../APIClients/mutations/AuthMutations";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

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
        <Image htmlHeight='5' src={logo}/>
        <Heading>Sign in to access courses</Heading>
        <form>
          <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input 
              type="email" 
              placeholder="you@rowanhouse.ca"
              onChange={(event) => setEmail(event.target.value)} 
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
          Don&lsquo;t have an account?{" "}
          <Link 
            color="purple" 
            onClick={onSignUpClick}
            href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2"
            >
            Sign Up
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
