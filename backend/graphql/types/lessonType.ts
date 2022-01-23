import { gql } from "apollo-server-express";

// TO DO: Fix content typing

const lessonType = gql`
  type LessonDTO {
    id: ID!
    course: ID!
    title: String
    description: String
    image: String
    content: [Object]
  }

  input CreateLessonDTO {
    course: ID!
    title: String
    description: String
    image: String
    content: [Object]
  }
`;

export default lessonType;
