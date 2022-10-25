import React, { useEffect, useRef, useState } from "react";
import { FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";

import ImageUpload from "../../../common/ImageUpload";
import { Modal } from "../../../common/Modal";
import { TextArea } from "../../../common/TextArea";
import { ImageBlockState } from "../../../../types/ContentBlockTypes";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import { UPLOAD_IMAGE } from "../../../../APIClients/mutations/CourseMutations";

const EditImageModal = ({
  block: { content },
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<ImageBlockState>): React.ReactElement => {
  const [path, setPath] = useState(content.path);
  const [description, setDescription] = useState(content.description);
  const [invalid, setInvalid] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  useEffect(() => {
    setPath(content.path);
    setDescription(content.description);
  }, [isOpen, content]);

  const onConfirm = () => {
    if (!description) {
      setInvalid(true);
      return;
    }
    onSave({
      path,
      description,
    });
  };

  const initialFocusRef = useRef(null);

  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  return (
    <Modal
      size="xl"
      header="Image"
      onConfirm={onConfirm}
      onCancel={onCancel}
      isOpen={isOpen}
      initialFocusRef={initialFocusRef}
      canSubmit={canSubmit}
    >
      <HStack align="stretch">
        <FormControl display="flex" flexDirection="column">
          <FormLabel fontWeight={400}>Image</FormLabel>
          <ImageUpload
            uploadImage={async (file) => {
              setCanSubmit(false);
              const result = await uploadImage({ variables: { file } });
              const { image, path: uploadedPath } =
                result.data.uploadImage || {};
              setPath(uploadedPath);
              setCanSubmit(true);
              return image;
            }}
            width="100%"
          />
        </FormControl>
        <TextArea
          ref={initialFocusRef}
          label="Description"
          defaultValue={description}
          isRequired
          isInvalid={invalid}
          isFullHeight
          onChange={(newText) => {
            setInvalid(!newText);
            setDescription(newText);
          }}
        />
      </HStack>
    </Modal>
  );
};

export default EditImageModal;
