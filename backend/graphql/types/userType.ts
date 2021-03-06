import { gql } from "apollo-server-express";

const userType = gql`
  enum Role {
    Learner
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

  input UpdateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    town: String!
    role: Role!
  }

  extend type Query {
    userById(id: ID!): UserDTO!
    userByEmail(email: String!): UserDTO!
    users: [UserDTO!]!
    usersCSV: String!
    userCountByTown(startDate: String, endDate: String): String!
    emailVerifiedByEmail(email: String!): Boolean!
  }

  extend type Mutation {
    createUser(user: CreateUserDTO!): UserDTO!
    updateUser(id: ID!, user: UpdateUserDTO!): UserDTO!
    updateUserRole(id: ID!, userRole: Role!): Role!
    deleteUserById(id: ID!): ID
    deleteUserByEmail(email: String!): ID
  }
`;

export default userType;
