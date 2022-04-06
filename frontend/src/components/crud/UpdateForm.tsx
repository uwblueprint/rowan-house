import React, { useState } from "react";
import { JSONSchema7 } from "json-schema";
import { Form } from "@rjsf/bootstrap-4";
import { useMutation } from "@apollo/client";

import {
  EntityRequest,
  EntityResponse,
} from "../../APIClients/types/EntityClientTypes";
import { UPDATE_ENTITY } from "../../APIClients/mutations/EntityMutations";

const schema: JSONSchema7 = {
  title: "Update Entity",
  description: "A simple form to test updating an entity",
  type: "object",
  required: [
    "id",
    "stringField",
    "intField",
    "stringArrayField",
    "enumField",
    "boolField",
  ],
  properties: {
    id: {
      type: "string",
      title: "entity id",
      default: "123abc456def7890ghij1234",
    },
    stringField: {
      type: "string",
      title: "String Field",
      default: "UW Blueprint",
    },
    intField: {
      type: "integer",
      title: "Integer Field",
      default: 2017,
    },
    stringArrayField: {
      type: "array",
      items: {
        type: "string",
      },
      title: "String Array Field",
      default: [],
    },
    enumField: {
      type: "string",
      enum: ["A", "B", "C", "D"],
      title: "Enum Field",
      default: "A",
    },
    boolField: {
      type: "boolean",
      title: "Boolean Field",
      default: true,
    },
  },
};

const uiSchema = {
  boolField: {
    "ui:widget": "select",
  },
};

const UpdateForm = (): React.ReactElement => {
  const [data, setData] = useState<EntityResponse | null>(null);
  const [fileField, setFileField] = useState<File | null>(null);
  const [formFields, setFormFields] = useState<EntityRequest | null>(null);

  const [updateEntity] = useMutation<{ updateEntity: EntityResponse }>(
    UPDATE_ENTITY,
  );

  if (data) {
    return <p>Updated! ✔️</p>;
  }

  const fileChanged = (e: { target: HTMLInputElement }) => {
    if (e.target.files) {
      const fileSize = e.target.files[0].size / 1024 / 1024;
      if (fileSize > 5) {
        // eslint-disable-next-line no-alert
        window.alert("Your file exceeds 5MB. Upload a smaller file.");
      } else {
        setFileField(e.target.files[0]);
      }
    }
  };

  const onSubmit = async ({ formData }: { formData: EntityResponse }) => {
    const { id, ...entityData } = formData;

    const graphQLResult = await updateEntity({
      variables: {
        id: formData.id,
        entity: entityData as EntityRequest,
        file: fileField,
      },
    });
    const result: EntityResponse | null =
      graphQLResult.data?.updateEntity ?? null;
    setData(result);
  };
  return (
    <>
      <input type="file" onChange={fileChanged} />
      <Form
        formData={formFields}
        schema={schema}
        uiSchema={uiSchema}
        onChange={({ formData }: { formData: EntityRequest }) =>
          setFormFields(formData)
        }
        onSubmit={onSubmit}
      />
    </>
  );
};

export default UpdateForm;
