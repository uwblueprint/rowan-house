import { gql } from "apollo-server-express";

const courseType = gql`
  scalar Upload

  type ModuleResponseDTO {
    id: ID!
    title: String!
    description: String
    image: String
    previewImage: String
    published: Boolean!
    lessons: [String]
  }

  input ModuleRequestDTO {
    id: ID
    title: String!
    description: String
    image: String
    previewImage: String
    published: Boolean
    lessons: [String]
  }

  type CourseResponseDTO {
    id: ID!
    title: String!
    description: String
    image: String
    previewImage: String
    modules: [ModuleResponseDTO]
    private: Boolean!
  }

  type ModuleImageResponseDTO {
    image: String
    path: String
  }
  input CreateCourseRequestDTO {
    title: String!
    description: String
    image: String
    previewImage: String
    modules: [ModuleRequestDTO]
    private: Boolean
  }

  input UpdateCourseRequestDTO {
    title: String
    description: String
    image: String
    previewImage: String
    modules: [ModuleRequestDTO]
    private: Boolean
  }

  extend type Query {
    course(id: ID!): CourseResponseDTO!
    courses: [CourseResponseDTO!]!
    publicCourses: [CourseResponseDTO!]!
  }

  extend type Mutation {
    createCourse(
      course: CreateCourseRequestDTO!
      file: Upload
    ): CourseResponseDTO!
    updateCourse(
      id: ID!
      course: UpdateCourseRequestDTO!
      file: Upload
    ): CourseResponseDTO
    deleteCourse(id: ID!): ID
    uploadModuleImage(file: Upload): ModuleImageResponseDTO
  }
`;

export default courseType;
