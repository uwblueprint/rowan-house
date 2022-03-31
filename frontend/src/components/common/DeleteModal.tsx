import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalProps } from "./Modal";

export interface DeleteModalProps extends ModalProps {
  name: string;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { name } = props;

  return (
      <Modal
          size="sm"
          header={`Delete ${name}`}
          bodyText={`Are you sure? You can't undo this action afterwards.`}
          // confirmButtonColorScheme="red"
         // cancelButtonColorScheme="white"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      />
  );
};

DeleteModal.propTypes = {
  name: PropTypes.string.isRequired
}

export default DeleteModal;