import { gql } from "apollo-server-express";

// TO DO: Define Content parameters

const lessonType = gql`
  scalar Content

  type LessonResponseDTO {
    id: ID!
    course: ID!
    module: ID!
    title: String
    description: String
    image: String
    content: [Content!]
  }

  input CreateLessonRequestDTO {
    course: ID!
    module: ID!
    title: String
    description: String
    image: String
    content: [Content!]
  }

  input UpdateLessonRequestDTO {
    course: ID
    title: String
    description: String
    image: String
    content: [Content!]
  }

  extend type Query {
    lessonById(id: ID!): LessonResponseDTO!
  }

  extend type Mutation {
    createLesson(lesson: CreateLessonRequestDTO!): LessonResponseDTO!
    updateLesson(id: ID!, lesson: UpdateLessonRequestDTO!): LessonResponseDTO!
    deleteLesson(id: ID!): ID!
  }
`;

export default lessonType;
