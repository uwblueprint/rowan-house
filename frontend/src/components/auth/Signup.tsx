import React, { useContext, useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Button,
  Center,
  Box,
  Flex,
  VStack,
  Image,
} from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { REGISTER } from "../../APIClients/mutations/AuthMutations";
import {
  HOME_PAGE,
  LOGIN_PAGE,
  VERIFY_EMAIL_PAGE,
} from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import RHSLogo from "../../assets/RHSlogo.png";
import BackgroundImage from "../../assets/signuppage.jpg";

const Signup = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorState, setErrorState] = useState(false);
  const history = useHistory();

  const [register] = useMutation<{ register: AuthenticatedUser }>(REGISTER);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const onSignupClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.register(
      firstName,
      lastName,
      email,
      town,
      password,
      register,
    );

    if(user === null){
      setErrorState(true);
    }

    setAuthenticatedUser(user);
  };

  const onSignInClick = () => {
    history.push(LOGIN_PAGE);
  };

  if (authenticatedUser) {
    return (
      <Redirect
        to={authenticatedUser?.emailVerified ? HOME_PAGE : VERIFY_EMAIL_PAGE}
      />
    );
  }

  const isMatch = password === currentPassword;
  const meetsLengthRequirements = password.length >= 6;

  return (
    <Flex>
      <Center flex="1">
        <VStack marginLeft="30vh" marginRight="30vh">
          <Image
            height="13vh"
            marginBottom="2.5vh"
            marginTop="2.5vh"
            src={RHSLogo}
          />
          <Box>
            <Center>
              <Text variant="display-sm-sb">Sign up for courses</Text>{" "}
            </Center>
            <FormControl
              isRequired
              isInvalid={errorState && (firstName === '' || lastName === '')}
            >
              <FormLabel
                variant="caption-md"
                marginTop="4vh"
                marginBottom="1vh"
              >
                Name
              </FormLabel>

              <Box display="flex">
                <Input
                  ref={nameRef}
                  autocomplete="given-name"
                  type="text"
                  placeholder="First"
                  value={firstName}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    setFirstName(event.currentTarget.value)
                  }
                  marginBottom="2vh"
                  marginRight="1vh"
                />
                <Input
                  autocomplete="family-name"
                  type="text"
                  placeholder="Last"
                  value={lastName}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    setLastName(event.currentTarget.value)
                  }
                  marginBottom="2vh"
                />
              </Box>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errorState && email === ''}
            >
              <FormLabel variant="caption-md" marginBottom="1vh">
                Email Address
              </FormLabel>
              <Input
                type="email"
                autocomplete="email"
                value={email}
                placeholder="you@rowanhouse.ca"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setEmail(event.currentTarget.value)
                }
                marginBottom="2vh"
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errorState && town === ''}
            >
              <FormLabel variant="caption-md" marginBottom="1vh">
                City/Town
              </FormLabel>
              <Input
                autocomplete="address-level2"
                type="text"
                value={town}
                placeholder="Shaughnessy"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setTown(event.currentTarget.value)
                }
                marginBottom="2vh"
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errorState && !(isMatch && meetsLengthRequirements)}
            >
              <FormLabel variant="caption-md" marginBottom="1vh">
                Password
              </FormLabel>
              <Input
                type="password"
                value={password}
                placeholder="●●●●●●●●"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setPassword(event.currentTarget.value)
                }
                marginBottom="2vh"
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={errorState && !(isMatch && meetsLengthRequirements)}
            >
              <FormLabel variant="caption-md" marginBottom="1vh">
                Confirm Password
              </FormLabel>
              <Input
                type="password"
                value={currentPassword}
                placeholder="●●●●●●●●"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setCurrentPassword(event.currentTarget.value)
                }
                marginBottom={
                  errorState && !(isMatch && meetsLengthRequirements)
                    ? "0vh"
                    : "2vh"
                }
              />
              {errorState && !(isMatch && meetsLengthRequirements) && (
                <FormErrorMessage marginBottom="2vh">
                  {!meetsLengthRequirements
                    ? "Password should be at least 6 characters."
                    : "Passwords must match."}
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              variant="sm"
              width="full"
              onClick={() => {
                onSignupClick();
              }}
              marginBottom="2vh"
            >
              Sign Up
            </Button>
            <Center>
              Have an account?&nbsp;
              <Button
                variant="link"
                color="brand.royal"
                onClick={onSignInClick}
                textDecorationLine="underline"
              >
                Sign in
              </Button>
            </Center>
          </Box>
        </VStack>
      </Center>
      <Image width="50vw" objectFit="cover" src={BackgroundImage} />
    </Flex>
  );
};

export default Signup;
