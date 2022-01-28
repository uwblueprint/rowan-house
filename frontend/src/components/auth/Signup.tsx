import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

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
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
            placeholder="first name"
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
            placeholder="last name"
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            placeholder="username@domain.com"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            placeholder="password"
          />
        </div>
        <div>
          <input
            type="town"
            value={town}
            onChange={(event) => setTown(event.currentTarget.value)}
            placeholder="Lethbridge"
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={onSignupClick}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
