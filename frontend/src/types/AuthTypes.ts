import USER_ROLES from "../constants/UserConstants";

export type Role = typeof USER_ROLES[number];
export type AuthenticatedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  accessToken: string;
  emailVerified: boolean;
} | null;

export type DecodedJWT =
  | string
  | null
  | { [key: string]: unknown; exp: number };
