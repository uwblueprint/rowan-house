import { createContext } from "react";
import { AuthUser } from "../types/AuthTypes";

type AuthContextType = {
  authUser: AuthUser;
  setAuthUser: (_authUser: AuthUser) => void;
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  setAuthUser: (_authUser: AuthUser): void => {},
});

export default AuthContext;
