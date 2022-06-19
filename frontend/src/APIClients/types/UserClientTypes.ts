import { Role } from "../../types/AuthTypes";

export type UserRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  town?: string;
  role?: Role;
};

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  town: string;
  role: Role;
};
