export type Role = "User" | "Admin" | "Staff";

export type ContentType = "text" | "image" | "video";
export interface ContentBlock {
  type: ContentType;
  content: Record<string, unknown>;
}

export interface TextBlock extends ContentBlock {
  content: { text: string };
}

export interface ImageBlock extends ContentBlock {
  content: { link: string };
}

export interface VideoBlock extends ContentBlock {
  content: { link: string };
}

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  town: string;
  role: Role;
};

export type CreateUserDTO = Omit<UserDTO, "id"> & { password: string };

export type UpdateUserDTO = Omit<UserDTO, "id">;

export type RegisterUserDTO = Omit<CreateUserDTO, "role">;

export type AuthenticatedUserDTO = UserDTO & { emailVerified: boolean };

export type AuthDTO = Token & AuthenticatedUserDTO;

export type Letters = "A" | "B" | "C" | "D";

export type NodemailerConfig = {
  service: "gmail";
  auth: {
    type: "OAuth2";
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
};

export type SignUpMethod = "PASSWORD" | "GOOGLE";
