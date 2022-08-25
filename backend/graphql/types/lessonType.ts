import { gql } from "apollo-server-express";

const lessonType = gql`
  scalar Content

  scalar ContentInput

  type ContentBlock {
    type: String!
    content: Content!
  }

  input ContentBlockInput {
    type: String!
    content: ContentInput!
  }

  type LessonResponseDTO {
    id: ID!
    course: ID!
    module: ID!
    title: String
    description: String
    image: String
    content: [ContentBlock]
  }

  input CreateLessonRequestDTO {
    course: ID!
    module: ID!
    title: String
    description: String
    image: String
    content: [ContentBlockInput]
  }

  input UpdateLessonRequestDTO {
    course: ID
    module: ID
    title: String
    description: String
    image: String
    content: [ContentBlockInput]
  }

  extend type Query {
    lessonById(id: ID!): LessonResponseDTO!
    lessons(ids: [ID!]!): [LessonResponseDTO!]!
    lessonTitles(ids: [ID!]!): [String!]!
  }

  extend type Mutation {
    createLesson(lesson: CreateLessonRequestDTO!): LessonResponseDTO!
    updateLesson(id: ID!, lesson: UpdateLessonRequestDTO!): LessonResponseDTO!
    deleteLesson(id: ID!): ID!
  }
`;

export default lessonType;
