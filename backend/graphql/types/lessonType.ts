import { gql } from "apollo-server-express";

// TO DO: Fix content typing

const lessonType = gql`
  type LessonDTO {
    id: ID!
    course: ID!
    title: String
    description: String
    image: String
    content: [ID!]
  }

  input CreateLessonDTO {
    course: ID!
    title: String
    description: String
    image: String
    content: [ID!]
  }

  extend type Query {
    lessonById(id: ID!): LessonDTO!
  }

  extend type Mutation {
    createLesson(lesson: CreateLessonDTO!): LessonDTO!
  }
`;

export default lessonType;
