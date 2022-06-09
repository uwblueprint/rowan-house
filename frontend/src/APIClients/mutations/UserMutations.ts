import { gql } from "@apollo/client";

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $user: UpdateUserDTO!) {
    updateUser(id: $id, user: $user) {
      id
      firstName
      lastName
      email
      town
      role
    }
  }
`;

export default UPDATE_USER;
