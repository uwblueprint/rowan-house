import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

//   TODO: Update the mutation here to take in town as well
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
  //   TODO: Add state for town
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useMutation<{ register: AuthenticatedUser }>(REGISTER);

  const onSignupClick = async () => {
    //   TODO: Pass in town to register function
    const user: AuthenticatedUser = await authAPIClient.register(
      firstName,
      lastName,
      email,
      password,
      town,
      register,
    );
    setAuthenticatedUser(user);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  //   TODO: Add town input to form
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Signup</h1>
      <form>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="first name"
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="last name"
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="username@domain.com"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          />
        </div>
        <div>
          <input
            type="town"
            value={town}
            onChange={(event) => setTown(event.target.value)}
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
