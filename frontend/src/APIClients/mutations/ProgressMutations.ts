import { gql } from "@apollo/client";

export const MARK_MODULE_AS_STARTED = gql`
  mutation MarkModuleAsStarted(
    $userId: ID!
    $courseId: ID!
    $moduleIndex: Int!
  ) {
    markModuleAsStartedForUser(
      userId: $userId
      courseId: $courseId
      moduleIndex: $moduleIndex
    )
  }
`;

export const MARK_MODULE_AS_COMPLETED = gql`
  mutation MarkModuleAsCompleted(
    $userId: ID!
    $courseId: ID!
    $moduleIndex: Int!
  ) {
    markModuleAsCompletedForUser(
      userId: $userId
      courseId: $courseId
      moduleIndex: $moduleIndex
    )
  }
`;

export const MARK_LESSON_AS_COMPLETED = gql`
  mutation MarkLessonAsCompleted($userId: ID!, $lessonId: ID!) {
    markLessonAsCompletedForUser(userId: $userId, lessonId: $lessonId)
  }
`;
