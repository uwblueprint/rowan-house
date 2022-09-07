import { gql } from "@apollo/client";

const GET_LESSONS = gql`
  query GetLessons($ids: [ID!]!) {
    lessons(ids: $ids) {
      id
      course
      module
      title
      description
      image
      content {
        type
        content
      }
    }
  }
`;

export const GET_LESSON_TITLES = gql`
  query GetLessonsTitles($ids: [ID!]!) {
    lessonTitles(ids: $ids)
  }
`;

export default GET_LESSONS;
