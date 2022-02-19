import { gql } from "apollo-server-express";

const courseType = gql`
  type CourseResponseDTO {
    id: ID!
    title: String!
    description: String
    image: String
    previewImage: String
    lessons: [ID!]!
    private: Boolean!
    published: Boolean!
  }

  input CreateCourseRequestDTO {
    title: String!
    description: String
    image: String
    previewImage: String
    lessons: [ID!]!
    private: Boolean
    published: Boolean
  }

  input UpdateCourseRequestDTO {
    title: String
    description: String
    image: String
    previewImage: String
    lessons: [ID!]
    private: Boolean
    published: Boolean
  }

  extend type Query {
    course(id: ID!): CourseResponseDTO!
    courses: [CourseResponseDTO!]!
  }

  extend type Mutation {
    createCourse(course: CreateCourseRequestDTO!): CourseResponseDTO!
    updateCourse(id: ID!, course: UpdateCourseRequestDTO!): CourseResponseDTO
    deleteCourse(id: ID!): ID
  }
`;

export default courseType;
