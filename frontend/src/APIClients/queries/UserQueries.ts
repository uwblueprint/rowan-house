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

export const GET_USER_WITH_VERIFICATION_STATUS_BY_EMAIL = gql`
  query GetUserWithVerificationStatusByEmail($email: String!) {
    userWithVerificationStatusByEmail(email: $email) {
      id
      firstName
      lastName
      email
      town
      role
      emailVerified
    }
  }
`;
