import { gql } from "@apollo/client";

export const CREATE_LESSON = gql`
  mutation CreateLesson($lesson: CreateLessonRequestDTO!) {
    createLesson(lesson: $lesson) {
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

export const UPDATE_LESSON = gql`
  mutation UpdateLesson($id: ID!, $lesson: UpdateLessonRequestDTO!) {
    updateLesson(id: $id, lesson: $lesson) {
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

export const DELETE_LESSON = gql`
  mutation deleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;
