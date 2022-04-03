import { gql } from "@apollo/client";

export const GET_LESSON = gql`
query GetLesson($id: ID!) {
    lessonbyId(id: ID!) {
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
`