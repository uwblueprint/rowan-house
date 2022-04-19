import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    user: userByEmail(email: $email) {
      id
      firstName
      lastName
      email
      town
      role
    }
  }
`;
