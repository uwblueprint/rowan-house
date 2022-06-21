import { gql } from "apollo-server-express";

const courseType = gql`
  type ModuleResponseDTO {
    id: ID!
    title: String!
    description: String
    image: String
    previewImage: String
    published: Boolean!
    lessons: [String]
    file: Upload
    fileName: String
  }

  input ModuleRequestDTO {
    id: ID
    title: String!
    description: String
    image: String
    previewImage: String
    published: Boolean
    lessons: [String]
    filePath: String
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
    courseFile(fileUUID: ID!): String!
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
  }
`;

export default courseType;
