export type Role = "Learner" | "Admin" | "Staff";

export type ContentType =
  | "button"
  | "column"
  | "text"
  | "image"
  | "video"
  | "heading";
export interface ContentBlock {
  type: ContentType;
  content: Record<string, unknown>;
}

export interface ButtonBlock extends ContentBlock {
  content: { link: string; text: string };
}

export interface ColumnBlock extends ContentBlock {
  content: { left: ContentBlock; right: ContentBlock };
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

export interface HeadingBlock extends ContentBlock {
  content: { text: string; size: string };
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

export type AuthDTO = Token & UserDTO & { emailVerified: boolean };

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
