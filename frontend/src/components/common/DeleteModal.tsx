import React from "react";
import { Modal, ModalProps } from "./Modal";

export interface DeleteModalProps extends ModalProps {
  name: string;
}

const DeleteModal = (props: DeleteModalProps): React.ReactElement => {
  const { name } = props;

  return (
    <Modal
      size="sm"
      header={`Delete ${name}`}
      bodyText={`Are you sure? You can't undo this action afterwards.`}
      // cancelButtonColorScheme="ghost"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default DeleteModal;
