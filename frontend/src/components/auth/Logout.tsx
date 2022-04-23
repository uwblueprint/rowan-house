import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";

import authAPIClient from "../../APIClients/AuthAPIClient";
import AuthContext from "../../contexts/AuthContext";

const LOGOUT = gql`
  mutation Logout($userId: ID!) {
    logout(userId: $userId)
  }
`;

const Logout = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [logout] = useMutation<{ logout: null }>(LOGOUT);

  const onLogOutClick = async () => {
    try {
      await authAPIClient.logout(String(authenticatedUser?.id), logout);
    } catch (e) {
      console.warn(`Error when logging out: ${e}`);
      setAuthenticatedUser(null);
    }
  };

  return (
    <button type="button" className="btn btn-primary" onClick={onLogOutClick}>
      Log Out
    </button>
  );
};

export default Logout;
