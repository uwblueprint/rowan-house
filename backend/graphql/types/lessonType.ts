import { gql } from "apollo-server-express";

// TO DO: Define Content parameters

const lessonType = gql`
  scalar Content

  type LessonResponseDTO {
    id: ID!
    course: ID!
    title: String
    description: String
    image: String
    content: [Content!]
  }

  input LessonRequestDTO {
    course: ID!
    title: String
    description: String
    image: String
    content: [Content!]
  }

  extend type Query {
    lessonById(id: ID!): LessonResponseDTO!
  }

  extend type Mutation {
    createLesson(lesson: LessonRequestDTO!): LessonResponseDTO!
    updateLesson(id: ID!, lesson: LessonRequestDTO!): LessonResponseDTO!
    deleteLesson(id: ID!): ID!
  }
`;

export default lessonType;
