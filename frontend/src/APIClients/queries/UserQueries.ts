import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const USERS = gql`
  query Users {
    users {
      id
      firstName
      lastName
      email
      town
      role
    }
  }
`;
