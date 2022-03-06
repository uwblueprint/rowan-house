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
    <Flex>
      <Image
        // style={{
        //   alignSelf: 'center',
        //   height: 150,
        //   width: 150,
        //   borderWidth: 1,
        //   borderRadius: 75
        // }}
        source={background}
        // resizeMode="stretch"
      />
      <Stack>
          <Image htmlHeight='5' src={logo}/>
        <Heading>Sign in to access courses</Heading>
        <form>
          <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input type="email" placeholder="you@rowanhouse.ca" />
          </FormControl>
          <Button
                  borderRadius={1}
                  type="submit"
                  variant="solid"
                  colorScheme= "purple"
                  width="full"
                >
                  Continue
          </Button>
        </form>
      </Stack>
      <Box>
         Don&lsquo;t have an account?{" "}
         <Link color="purple" href="https://www.figma.com/file/9KqGifATPcKRQytJBqAKeJ/User-Authentication?node-id=316%3A2">
           Sign Up
         </Link>
      </Box>
    </Flex>

    // <div style={{ textAlign: "center" }}>
    //   <h1>Login</h1>
    //   <form>
    //     <div>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(event) => setEmail(event.target.value)}
    //         placeholder="username@domain.com"
    //       />
    //     </div>
    //     <div>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(event) => setPassword(event.target.value)}
    //         placeholder="password"
    //       />
    //     </div>
    //     <div>
    //       <button
    //         className="btn btn-primary"
    //         type="button"
    //         onClick={onLogInClick}
    //       >
    //         Log In
    //       </button>
    //     </div>
    //   </form>
    //   <div>
    //     <button
    //       className="btn btn-primary"
    //       type="button"
    //       onClick={onSignUpClick}
    //     >
    //       Sign Up
    //     </button>
    //   </div>
    // </div>
  );
};

export default Login;