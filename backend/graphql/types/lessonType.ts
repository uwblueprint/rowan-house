import { gql } from "apollo-server-express";

const lessonType = gql`
  type LessonDTO {
    id: ID!
    course: ID!
    title: String
    description: String
    image: String
    content: [Object]
  }

  input CreateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    password: String!
  }

  input UpdateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
  }

`;

export default lessonType;
