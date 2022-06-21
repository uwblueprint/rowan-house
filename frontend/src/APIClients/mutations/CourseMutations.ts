import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation CreateCourse($course: CreateCourseRequestDTO!, $file: Upload) {
    createCourse(course: $course, file: $file) {
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
      fileName
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $course: UpdateCourseRequestDTO!
    $file: Upload
  ) {
    updateCourse(id: $id, course: $course, file: $file) {
      title
      description
      image
      previewImage
      fileName
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

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;
