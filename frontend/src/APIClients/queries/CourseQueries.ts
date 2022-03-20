import { gql } from "@apollo/client";

export const COURSES = gql`
  query Courses {
    courses {
      title
      description
      image
      previewImage
      lessons
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
      lessons
      private
      published
    }
  }
`;
