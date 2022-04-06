import { gql } from "@apollo/client";

export const ENTITIES = gql`
  query DisplayTableContainer_Entities {
    entities {
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

export const ENTITIESCSV = gql`
  query DisplayTableContainer_EntitiesCSV {
    entitiesCSV
  }
`;

export const FILE = gql`
  query DisplayTableContainer_File($fileUUID: ID!) {
    file(fileUUID: $fileUUID)
  }
`;
