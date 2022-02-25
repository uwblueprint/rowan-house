import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Stack,
  Button,
  Text,
  Input
} from "@chakra-ui/react";
import Logo from "../logo.png";

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
    <Flex direction="column">
      <Stack>
        <Image src={Logo}/>
        <Heading>Sign in to access courses.</Heading>
      </Stack>

      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input>
          id="email"
  //      value={email}
  //      onChange={(event) => setEmail(event.target.value)}
  //      placeholder="you@rowanhouse.ca"
        </Input>
      </FormControl>
      <Stack>
        <Text as="div" textAlign="center">
          <span>Don&lsquo;t have an account?</span>
          <Button colorScheme="purple" variant="link">
            Sign up
          </Button>
        </Text>
      </Stack>
    </Flex>
  );

  // return (
  //   <Flex>
  //     <Box>
  //       <Heading>Sign in to access courses</Heading>
  //       <FormControl>
  //         <FormLabel htmlFor>input 1</FormLabel>
  //           <Input
  //             id="email"
  //             value={email}
  //             onChange={(event) => setEmail(event.target.value)}
  //             placeholder="username@domain.com"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(event) => setPassword(event.target.value)}
  //             placeholder="password"
  //           />
  //         </div>
  //         <div>
  //           <button
  //             className="btn btn-primary"
  //             type="button"
  //             onClick={onLogInClick}
  //           >
  //             Log In
  //           </button>
  //         </div>
  //       </FormControl>
  //       <div>
  //         <button
  //           className="btn btn-primary"
  //           type="button"
  //           onClick={onSignUpClick}
  //         >
  //           Sign Up
  //         </button>
  //       </div>
  //     </Box>
  //   </Flex>
  // );
};

export default Login;
