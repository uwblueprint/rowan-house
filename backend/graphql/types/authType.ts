import { gql } from "apollo-server-express";

const authType = gql`
  type AuthDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    town: String!
    role: Role!
    accessToken: String!
    emailVerified: Boolean!
  }

  input RegisterUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    town: String!
    password: String!
  }

  extend type Query {
    emailVerifiedByAccessToken(email: String!, accessToken: String!): Boolean!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthDTO!
    register(user: RegisterUserDTO!): AuthDTO!
    refresh: String!
    logout(userId: ID!): ID
    resetPassword(email: String!): Boolean!
  }
`;

export default authType;
