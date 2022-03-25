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
      published
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: String) {
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
      published
    }
  }
`;
