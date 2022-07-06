import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import authAPIClient from "../APIClients/AuthAPIClient";
import AuthContext from "../contexts/AuthContext";

const LOGOUT = gql`
  mutation Logout($userId: ID!) {
    logout(userId: $userId)
  }
`;

const useLogout = (): (() => Promise<void>) => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const history = useHistory();

  const [logout] = useMutation<{ logout: null }>(LOGOUT);

  const tryLogout = async () => {
    try {
      const maxTries = 3;
      for (let tries = 0; tries < maxTries; tries += 1) {
        // Await-in-loop is fine here since these must run sequentially.
        // eslint-disable-next-line no-await-in-loop
        const logoutSucceeded = await authAPIClient.logout(
          String(authenticatedUser?.id),
          logout,
        );
        if (logoutSucceeded) return;
      }
      // eslint-disable-next-line no-console
      console.error(`Failed to log out after ${maxTries} tries, giving up...`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(`Error when logging out: ${e}`);
    } finally {
      setAuthenticatedUser(null);
      history.push("/");
    }
  };
  return tryLogout;
};

export default useLogout;
