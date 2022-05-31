import { gql } from "apollo-server-express";

const userType = gql`
  enum Role {
    User
    Admin
    Staff
  }

  type UserDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    town: String!
    role: Role!
  }

  input CreateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    town: String!
    role: Role!
    password: String!
  }

  type UserWithVerificationStatusDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    town: String!
    role: Role!
    emailVerified: Boolean!
  }

  input UpdateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    town: String!
    role: Role!
  }

  extend type Query {
    userById(id: ID!): UserDTO!
    userWithVerificationStatusByEmail(
      email: String!
    ): UserWithVerificationStatusDTO!
    userByEmail(email: String!): UserDTO!
    users: [UserDTO!]!
    usersCSV: String!
    userCountByTown(startDate: String, endDate: String): String!
  }

  extend type Mutation {
    createUser(user: CreateUserDTO!): UserDTO!
    updateUser(id: ID!, user: UpdateUserDTO!): UserDTO!
    deleteUserById(id: ID!): ID
    deleteUserByEmail(email: String!): ID
  }
`;

export default userType;
