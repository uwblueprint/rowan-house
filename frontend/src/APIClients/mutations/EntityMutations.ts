import { gql } from "@apollo/client";

export const CREATE_ENTITY = gql`
  mutation CreateForm_CreateEntity($entity: EntityRequestDTO!, $file: Upload) {
    createEntity(entity: $entity, file: $file) {
      id
      stringField
      intField
      enumField
      stringArrayField
      boolField
      fileName
    }
  }
`;

export const UPDATE_ENTITY = gql`
  mutation UpdateForm_UpdateEntity(
    $id: ID!
    $entity: EntityRequestDTO!
    $file: Upload
  ) {
    updateEntity(id: $id, entity: $entity, file: $file) {
      id
      stringField
      intField
      enumField
      stringArrayField
      boolField
      fileName
    }
  }
`;
