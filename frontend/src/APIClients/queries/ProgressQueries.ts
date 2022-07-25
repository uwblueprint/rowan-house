import { gql } from "@apollo/client";

export const GET_COURSE_PROGRESS = gql`
  query GetCourseProgress($userId: ID!, $courseIds: [ID!]!) {
    courseProgress(userId: $userId, courseIds: $courseIds) {
      courseId
      startedAt
      completedAt
    }
  }
`;

export const GET_LESSON_PROGRESS = gql`
  query GetLessonProgress($userId: ID!, $lessonIds: [ID!]!) {
    lessonProgress(userId: $userId, lessonIds: $lessonIds) {
      lessonId
      completedAt
    }
  }
`;
