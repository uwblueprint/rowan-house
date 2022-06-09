import { createContext, Dispatch, SetStateAction } from "react";
import { AuthUser } from "../types/AuthTypes";

type AuthContextType = {
  authUser: AuthUser;
  setAuthUser: Dispatch<SetStateAction<AuthUser>>;
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: (
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    _authUserSetStateAction: AuthUser | ((prevState: AuthUser) => AuthUser),
  ): void => {},
});

export default AuthContext;
