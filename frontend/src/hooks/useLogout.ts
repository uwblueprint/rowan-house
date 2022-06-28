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
      await authAPIClient.logout(String(authenticatedUser?.id), logout);
      await tryLogout();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(`Error when logging out: ${e}`);
      setAuthenticatedUser(null);
      history.push("/");
    }
  };
  return tryLogout;
};

export default useLogout;
