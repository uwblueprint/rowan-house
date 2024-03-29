import React, {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Flex,
  Text,
  Image,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  Button,
  VStack,
  Input,
  Center,
  Show,
  Spinner,
  Alert,
  AlertDescription,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import RHSLogo from "../../assets/RHSlogo.png";
import BackgroundImage from "../../assets/signuppage.jpg";

import authAPIClient from "../../APIClients/AuthAPIClient";
import {
  LOGIN,
  RESET_PASSWORD,
} from "../../APIClients/mutations/AuthMutations";
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

enum ResetEmailState {
  NotSent,
  SentSuccess,
  SentFailed,
}

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(LoginState.EnterEmail);
  const [loginFail, setLoginFail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [sendingResetEmail, setSendingResetEmail] = useState(false);
  const [resetEmail, setResetEmail] = useState(ResetEmailState.NotSent);
  const [sendResetPasswordLink] = useMutation<{ sent: boolean }>(
    RESET_PASSWORD,
  );
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const forgetPasswordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  useEffect(() => {
    emailRef.current?.focus();
    passwordRef.current?.focus();
    forgetPasswordRef.current?.focus();
  }, [loginState]);

  const [login, { loading }] = useMutation<{ login: AuthenticatedUser }>(LOGIN);

  const getLoginUser = async () => {
    const user: AuthenticatedUser = await authAPIClient.login(
      email,
      password,
      login,
    );
    if (user === null) {
      setLoginFail(true);
    }
    setAuthenticatedUser(user);
  };

  const onLogInClick = async () => {
    switch (loginState) {
      case LoginState.EnterEmail:
        if (emailRef.current?.validity.valid) {
          setLoginState(LoginState.EnterPassword);
        } else {
          setInvalidEmail(true);
        }
        break;
      case LoginState.EnterPassword:
        if (passwordRef.current?.validity.valid) {
          getLoginUser();
        }
        break;
      case LoginState.ForgetPassword:
        if (!email?.length) {
          setInvalidEmail(true);
          return;
        }
        setSendingResetEmail(true);
        try {
          await sendResetPasswordLink({
            variables: { email },
          });
          setResetEmail(ResetEmailState.SentSuccess);
        } catch (error: unknown) {
          setResetEmail(ResetEmailState.SentFailed);
        } finally {
          setSendingResetEmail(false);
        }
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
        setLoginFail(false);
        setInvalidEmail(false);
        return setLoginState(LoginState.EnterEmail);
      case LoginState.ForgetPassword:
        setLoginFail(false);
        setInvalidEmail(false);
        return setLoginState(LoginState.EnterPassword);
      default:
        throw new Error("Unexpected Error");
    }
  };
  const getResetEmailText = (): React.ReactElement => {
    switch (resetEmail) {
      case ResetEmailState.NotSent:
        return <></>;
      case ResetEmailState.SentFailed:
        return (
          <Alert status="error">
            <AlertDescription>
              Failed to send reset password email. Please try again.
            </AlertDescription>
          </Alert>
        );
      case ResetEmailState.SentSuccess:
        return (
          <Alert status="success">
            <AlertDescription>
              Reset password email sent! Please wait up to 5 minutes for it to
              arrive in your inbox.
            </AlertDescription>
          </Alert>
        );
      default:
        return <></>;
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
            <FormControl isInvalid={invalidEmail}>
              <FormLabel
                htmlFor="email"
                variant="caption-md"
                marginTop="4vh"
                marginBottom="1vh"
              >
                Email address
              </FormLabel>
              <Input
                ref={emailRef}
                type="email"
                value={email}
                placeholder="you@rowanhouse.ca"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                  setPassword("");
                }}
                onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter" && email?.length) {
                    onLogInClick();
                  }
                }}
                marginBottom={invalidEmail ? "0vh" : "3vh"}
              />
              <Input
                ref={passwordRef}
                type="password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                marginBottom="3vh"
                display="none"
              />
              {invalidEmail && (
                <FormErrorMessage marginBottom="3vh">
                  The email you entered is invalid.
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2vh"
              disabled={!email?.length}
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
            <Center paddingTop="1vh">
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
      case LoginState.EnterPassword:
        return (
          <Box>
            <Text variant="display-sm-sb">Sign in to access courses</Text>
            <FormControl isInvalid={loginFail}>
              <Box display="flex" marginTop="3vh">
                <Button onClick={() => onBackClick(loginState)} variant="link">
                  <ArrowBackIcon color="brand.royal" />
                  <Text variant="button" color="brand.royal">
                    Back
                  </Text>
                </Button>
              </Box>
              <FormLabel
                htmlFor="password"
                variant="caption-md"
                marginTop="1.5vh"
                marginBottom="1vh"
              >
                {" "}
                Password
              </FormLabel>
              <Input
                ref={emailRef}
                type="email"
                value={email}
                placeholder="you@rowanhouse.ca"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                marginBottom="3vh"
                display="none"
              />
              <Input
                ref={passwordRef}
                type="password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter" && password?.length) {
                    onLogInClick();
                  }
                }}
                marginBottom={loginFail ? "0vh" : "3vh"}
              />
              {loginFail && (
                <FormErrorMessage marginBottom="3vh">
                  The email or password you entered is incorrect.
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2vh"
              disabled={!password?.length}
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
            <Box marginBottom="1vh" width="100%">
              {getResetEmailText()}
            </Box>
            <Text variant="display-sm-sb">Forgot your password?</Text>
            <Box display="flex" marginTop="3vh">
              <Button
                onClick={() => onBackClick(loginState)}
                variant="link"
                disabled={sendingResetEmail}
              >
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
                ref={forgetPasswordRef}
                type="email"
                value={email}
                placeholder="you@rowanhouse.ca"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                marginBottom="3vh"
              />
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={onLogInClick}
              marginBottom="2vh"
              isLoading={sendingResetEmail}
              disabled={resetEmail === ResetEmailState.SentSuccess}
            >
              Send Reset Password Email
            </Button>
            <Center>
              Remembered your password?&nbsp;
              <Button
                disabled={sendingResetEmail}
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
      <Show above="md">
        <Image width="50vw" h="100vh" objectFit="cover" src={BackgroundImage} />
      </Show>
    </Flex>
  );
};

export default Login;
