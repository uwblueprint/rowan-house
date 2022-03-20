import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation CreateCourse($course: CreateCourseRequestDTO!) {
    createCourse(course: $course) {
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

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $course: UpdateCourseRequestDTO!) {
    updateCourse(id: $id, course: $course) {
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

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;
