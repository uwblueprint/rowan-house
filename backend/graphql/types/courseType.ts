import { gql } from "apollo-server-express";

const courseType = gql`
  type ModuleDTO {
    id: ID!
    title: String!
    description: String
    image: String
    previewImage: String
    published: Boolean!
    lessons: [String]
  }

  input ModuleInputDTO {
    id: ID
    title: String!
    description: String
    image: String
    previewImage: String
    published: Boolean!
    lessons: [String]
  }

  type CourseResponseDTO {
    id: ID!
    title: String!
    description: String
    image: String
    previewImage: String
<<<<<<< Updated upstream
    lessons: [ID!]!
    private: Boolean!
    published: Boolean!
=======
    modules: [ModuleDTO]
>>>>>>> Stashed changes
  }

  input CreateCourseRequestDTO {
    title: String!
    description: String
    image: String
    previewImage: String
<<<<<<< Updated upstream
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
=======
    modules: [ModuleInputDTO]
>>>>>>> Stashed changes
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
