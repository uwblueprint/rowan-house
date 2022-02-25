import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {
  Flex,
  Text,
  Image,
  FormControl,
  FormLabel,
  Link,
  Box,
  Button,
  VStack,
  Input,
  Center,
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

  // let or const
  // const onEmailInput = (event) => {
    
  //   // const re = /\S+@\S+\.\S+/;
  //   const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  //   if ( regexp.test(email) ) {
  //     <Text>"good."</Text>
  //     setEmail(email);
  //       // this is a valid email address
  //       // call setState({email: email}) to update the email
  //       // or update the data in redux store.
  //   }
  //   else {
  //     <Text>"try again."</Text>
  //       // invalid email, maybe show an error to the user.
  //   }
  // }

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
          <Image height="13vh" src={logo} />
          <Text variant="display-sm-sb" marginTop="1.5rem">Sign in to access courses</Text>
          <form>
            {isSecondPage ? (
              <>
                <FormControl>
                  <Text 
                    variant="caption"
                    paddingBottom="52px"
                    > Password</Text>
                  <Input
                    type="password"
                    placeholder="●●●●●"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormControl>
                <Button
                  variant="sm"
                  width="full"
                  onClick={onLogInClick}
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
              </>
            ) : (
              <>
                <FormControl>
                <Text variant="caption" marginTop="3.25rem">Email Address</Text>
                  <Input
                    type="email"
                    variant="default"
                    // value = {this.state.email}
                    placeholder="you@rowanhouse.ca"
                    onChange={(event) => setEmail(event.target.value)}
                    // onChange = {(event) => onEmailInput(event.target.value)}
                    marginBottom="1.75rem"
                    
                  />
                </FormControl>
                <Button
                  variant="sm"
                  width="full"
                  onClick={onLogInClick}
                  marginBottom="2.125rem"
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
              </>
            )}
          </form>
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
