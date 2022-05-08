import { gql } from "@apollo/client";

const GET_LESSONS = gql`
  query GetLessons($ids: [ID!]!) {
    lessonsByIds(ids: $ids) {
      id
      course
      module
      title
      description
      image
      content {
        type
        content {
          link
          text
        }
      }
    }
  }
`;

export default GET_LESSONS;
