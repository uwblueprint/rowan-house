import { gql } from "@apollo/client";

export const MARK_COURSE_AS_STARTED = gql`
  mutation MarkCourseAsStarted($userId: ID!, $courseId: ID!) {
    markCourseAsStartedForUser(userId: $userId, courseId: $courseId)
    number
  }
`;

export const MARK_COURSE_AS_COMPLETED = gql`
  mutation MarkCourseAsCompleted($userId: ID!, $courseId: ID!) {
    markCourseAsCompletedForUser(userId: $userId, courseId: $courseId)
    number
  }
`;

export const MARK_LESSON_AS_COMPLETED = gql`
  mutation MarkLessonAsCompleted($userId: ID!, $lessonId: ID!) {
    markLessonAsCompletedForUser(userId: $userId, lessonId: $lessonId)
    number
  }
`;
