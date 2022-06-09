import { createContext, Dispatch, SetStateAction } from "react";
import { AuthUser } from "../types/AuthTypes";

type AuthContextType = {
  authenticatedUser: AuthUser;
  setAuthUser: Dispatch<SetStateAction<AuthUser>>;
};

const AuthContext = createContext<AuthContextType>({
  authenticatedUser: null,
  setAuthUser: (
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _authenticatedUserSetStateAction:
      | AuthUser
      | ((prevState: AuthUser) => AuthUser),
  ): void => {},
});

export default AuthContext;
