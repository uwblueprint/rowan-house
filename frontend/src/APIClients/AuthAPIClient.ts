import {
  ApolloQueryResult,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { AuthUser } from "../types/AuthTypes";
import { setLocalStorageObjProperty } from "../utils/LocalStorageUtils";

type LoginFunction = (
  options?:
    | MutationFunctionOptions<{ login: AuthUser }, OperationVariables>
    | undefined,
) => Promise<
  FetchResult<
    { login: AuthUser },
    Record<string, unknown>,
    Record<string, unknown>
  >
>;

const login = async (
  email: string,
  password: string,
  loginFunction: LoginFunction,
): Promise<AuthUser | null> => {
  let user: AuthUser = null;
  try {
    const result = await loginFunction({ variables: { email, password } });
    user = result.data?.login ?? null;
    if (user) {
      localStorage.setItem(AUTHENTICATED_USER_KEY, JSON.stringify(user));
    }
  } catch (e: unknown) {
    // eslint-disable-next-line no-alert
    window.alert("Failed to login");
  }
  return user;
};

type RegisterFunction = (
  options?:
    | MutationFunctionOptions<{ register: AuthUser }, OperationVariables>
    | undefined,
) => Promise<
  FetchResult<
    { register: AuthUser },
    Record<string, unknown>,
    Record<string, unknown>
  >
>;

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  town: string,
  password: string,
  registerFunction: RegisterFunction,
): Promise<AuthUser | null> => {
  let user: AuthUser = null;
  try {
    const result = await registerFunction({
      variables: { firstName, lastName, email, town, password },
    });
    user = result.data?.register ?? null;
    if (user) {
      localStorage.setItem(AUTHENTICATED_USER_KEY, JSON.stringify(user));
    }
  } catch (e: unknown) {
    // eslint-disable-next-line no-alert
    window.alert("Failed to sign up");
  }
  return user;
};

type LogoutFunction = (
  options?:
    | MutationFunctionOptions<
        {
          logout: null;
        },
        OperationVariables
      >
    | undefined,
) => Promise<
  FetchResult<
    {
      logout: null;
    },
    Record<string, unknown>,
    Record<string, unknown>
  >
>;

const logout = async (
  authUserId: string,
  logoutFunction: LogoutFunction,
): Promise<boolean> => {
  const result = await logoutFunction({
    variables: { userId: authUserId },
  });
  let success = false;
  if (result.data?.logout === null) {
    success = true;
    localStorage.removeItem(AUTHENTICATED_USER_KEY);
  }
  return success;
};

type RefreshFunction = (
  options?:
    | MutationFunctionOptions<
        {
          refresh: string;
        },
        OperationVariables
      >
    | undefined,
) => Promise<
  FetchResult<
    {
      refresh: string;
    },
    Record<string, unknown>,
    Record<string, unknown>
  >
>;

const refresh = async (refreshFunction: RefreshFunction): Promise<boolean> => {
  try {
    const result = await refreshFunction({ variables: {} });
    const token = result.data?.refresh;
    if (!token) {
      return false;
    }
    setLocalStorageObjProperty(AUTHENTICATED_USER_KEY, "accessToken", token);
    return true;
  } catch (error) {
    return false;
  }
};

type GetEmailVerifiedByEmailFunction = (
  variables?:
    | Partial<{
        email: string;
      }>
    | undefined,
) => Promise<
  ApolloQueryResult<{
    emailVerifiedByEmail: boolean;
  }>
>;

const getEmailVerified = async (
  authUserEmail: string,
  getEmailVerifiedByEmailFunction: GetEmailVerifiedByEmailFunction,
): Promise<boolean | null> => {
  const { data, error } = await getEmailVerifiedByEmailFunction({
    email: authUserEmail,
  });
  if (error || data.emailVerifiedByEmail === undefined) {
    // TODO: add proper frontend logging
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(data);
    return null;
  }
  return data.emailVerifiedByEmail;
};

const updateAuthUserEmailVerified = (
  emailVerified: boolean,
  setAuthUser: Dispatch<SetStateAction<AuthUser>>,
): void => {
  setAuthUser((prevAuthUser: AuthUser) => {
    const newAuthUser = {
      ...prevAuthUser,
      emailVerified,
    } as AuthUser;
    localStorage.setItem(AUTHENTICATED_USER_KEY, JSON.stringify(newAuthUser));
    return newAuthUser;
  });
};

export default {
  login,
  logout,
  register,
  refresh,
  getEmailVerified,
  updateAuthUserEmailVerified,
};
