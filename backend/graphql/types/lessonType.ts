import { gql } from "apollo-server-express";

const lessonType = gql`

  interface Content {}

  ContentBlock {
    type: ContentType!
    content: Content!
  }

  type Image implements Content {
    link: String!
  }
    
  type Text implements Content {
    text: String!
  }

  type Video implements Content {
    link: String!
  }
  
  enum ContentType { text, image, video }

  type LessonResponseDTO {
    id: ID!
    course: ID!
    title: String
    description: String
    image: String
    content: [ContentBlock!]
  }

  input CreateLessonRequestDTO {
    course: ID!
    title: String
    description: String
    image: String
    content: [ContentBlock!]
  }

  input UpdateLessonRequestDTO {
    course: ID
    title: String
    description: String
    image: String
    content: [ContentBlock!]
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
