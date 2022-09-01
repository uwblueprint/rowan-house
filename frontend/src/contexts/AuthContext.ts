import { createContext, Dispatch, SetStateAction } from "react";
import { AuthenticatedUser } from "../types/AuthTypes";

export type AuthContextType = {
  authenticatedUser: AuthenticatedUser;
  setAuthenticatedUser: Dispatch<SetStateAction<AuthenticatedUser>>;
};

const AuthContext = createContext<AuthContextType>({
  authenticatedUser: null,
  setAuthenticatedUser: (
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _authenticatedUserSetStateAction:
      | AuthenticatedUser
      | ((prevState: AuthenticatedUser) => AuthenticatedUser),
  ): void => {},
});

export default AuthContext;
