import { gql } from "apollo-server-express";

const courseType = gql`
  type CourseResponseDTO {
    id: ID!
    title: String!
    description: String
    image: String
    previewImage: String
    lessons: [ID!]!
  }

  input CourseRequestDTO {
    title: String!
    description: String
    image: String
    previewImage: String
    lessons: [ID!]!
  }

  extend type Query {
    course(id: ID!): CourseResponseDTO!
    courses: [CourseResponseDTO!]!
  }

  extend type Mutation {
    createCourse(course: CourseRequestDTO!): CourseResponseDTO!
    updateCourse(id: ID!, course: CourseRequestDTO!): CourseResponseDTO
    deleteCourse(id: ID!): ID
  }
`;

export default courseType;
