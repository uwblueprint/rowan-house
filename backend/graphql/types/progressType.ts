import { gql } from "apollo-server-express";

const progressType = gql`
  scalar Date

  type CourseProgressResponseDTO {
    courseId: ID!
    startedAt: Date
    completedAt: Date
  }

  type LessonProgressResponseDTO {
    lessonId: ID!
    completedAt: Date
  }

  extend type Query {
    courseProgress(userId: ID!, courseIds: [ID!]): [CourseProgressResponseDTO!]
    lessonProgress(userId: ID!, lessonIds: [ID!]): [LessonProgressResponseDTO!]
  }

  extend type Mutation {
    markCourseAsStartedForUser(userId: ID!, courseId: ID!): Date!
    markModuleAsCompletedForUser(
      userId: ID!
      courseId: ID!
      moduleIndex: Int!
    ): Date!
    markLessonAsCompletedForUser(userId: ID!, lessonId: ID!): Date!
  }
`;

export default progressType;
