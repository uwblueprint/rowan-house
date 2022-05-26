import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const GET_USER_EMAIL_VERIFIED_BY_ACCESS_TOKEN = gql`
  query GetUserEmailVerifiedByAccessToken(
    $email: String!
    $accessToken: String!
  ) {
    emailVerifiedByAccessToken(email: $email, accessToken: $accessToken)
  }
`;
