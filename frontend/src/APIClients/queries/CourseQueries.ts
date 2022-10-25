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

// Same as COURSES but does not require authentication
export const PUBLIC_COURSES = gql`
  query PublicCourses {
    publicCourses {
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

export const GET_CONTENT_IMAGE = gql`
  query GetContentImage($path: String!) {
    contentImage(path: $path)
  }
`;
