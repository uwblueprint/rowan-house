import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Input, Stack } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

const REGISTER = gql`
  mutation Signup_Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $town: String!
    $password: String!
  ) {
    register(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        town: $town
        password: $password
      }
    ) {
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

const Signup = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useMutation<{ register: AuthenticatedUser }>(REGISTER);

  const onSignupClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.register(
      firstName,
      lastName,
      email,
      town,
      password,
      register,
    );
    setAuthenticatedUser(user);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Signup</h1>
      <form>
        <Stack spacing={3}>
          <Input
            type="text"
            placeholder="first name"
            size="md"
            value={firstName}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setFirstName(event.currentTarget.value)
            }
          />
          <Input
            type="text"
            placeholder="last name"
            size="md"
            value={lastName}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setLastName(event.currentTarget.value)
            }
          />
          <Input
            type="email"
            placeholder="email"
            size="md"
            value={email}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setEmail(event.currentTarget.value)
            }
          />
          <Input
            type="password"
            placeholder="password"
            size="md"
            value={password}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
          />
          <Input
            type="text"
            placeholder="town"
            size="md"
            value={town}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setTown(event.currentTarget.value)
            }
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={onSignupClick}
          >
            Sign Up
          </button>
        </Stack>
      </form>
    </div>
  );
};

export default Signup;
