import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation CreateCourse($course: CreateCourseRequestDTO!) {
    createCourse(course: $course) {
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

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $course: UpdateCourseRequestDTO!) {
    updateCourse(id: $id, course: $course) {
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

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload) {
    uploadModuleImage(file: $file) {
      previewImage
      filePath
    }
  }
`;
