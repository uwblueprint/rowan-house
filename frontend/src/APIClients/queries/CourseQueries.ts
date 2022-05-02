import { gql } from "@apollo/client";

export const COURSES = gql`
  query Courses {
    courses {
      id
      title
      description
      image
      previewImage
      modules {
        id
        title
        description
        image
        previewImage
        published
        lessons
      }
      private
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      title
      description
      image
      previewImage
      modules {
        id
        title
        description
        image
        previewImage
        published
        lessons
      }
      private
    }
  }
`;
