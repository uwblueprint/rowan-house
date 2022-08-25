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

export default GET_LESSONS;
