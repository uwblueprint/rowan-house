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

export const GET_EMAIL_VERIFIED_BY_EMAIL = gql`
  query GetEmailVerifiedByEmail($email: String!) {
    emailVerifiedByEmail(email: $email)
  }
`;

export const GET_USER_COUNT_BY_TOWN = gql`
  query GetUserCountByTown($startDate: String, $endDate: String) {
    userCountByTown(startDate: $startDate, endDate: $endDate)
  }
`;
