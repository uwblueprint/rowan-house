export type UserRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  town?: string;
  role?: string;
};

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  town: string;
  role: string;
};
