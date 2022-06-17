import { gql } from "@apollo/client";

const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($id: ID!, $userRole: Role!) {
    updateUserRole(id: $id, userRole: $userRole)
  }
`;

export default UPDATE_USER_ROLE;
