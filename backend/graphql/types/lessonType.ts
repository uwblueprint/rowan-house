import { gql } from "apollo-server-express";

const lessonType = gql`

  

  type Content {
   
    link: String
    text: String
  }

  input ContentInput {

    link: String
    text: String
  }

  
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
    title: String
    description: String
    image: String
    content: [ContentBlock]
  }

  input CreateLessonRequestDTO {
    course: ID!
    title: String
    description: String
    image: String
    content: [ContentBlockInput]
  }

  input UpdateLessonRequestDTO {
    course: ID
    title: String
    description: String
    image: String
    content: [ContentBlockInput]
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
