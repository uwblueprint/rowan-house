import React, { useEffect, useRef, useState } from "react";
import { FormControl, FormLabel, HStack } from "@chakra-ui/react";

import ImageUpload from "../../../common/ImageUpload";
import { Modal } from "../../../common/Modal";
import { TextArea } from "../../../common/TextArea";
import { ImageBlockState } from "../../../../types/ContentBlockTypes";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

const EditImageModal = ({
  block: { content },
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<ImageBlockState>): React.ReactElement => {
  const [path, setPath] = useState(content.path);
  const [description, setDescription] = useState(content.description);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setPath(content.path);
    setDescription(content.description);
  }, [isOpen, content]);

  const onConfirm = () => {
    if (!(path && description)) {
      setInvalid(true);
      return;
    }
    onSave({
      path,
      description,
    });
  };

  const initialFocusRef = useRef(null);

  return (
    <Modal
      size="xl"
      header="Image"
      onConfirm={onConfirm}
      onCancel={onCancel}
      isOpen={isOpen}
      initialFocusRef={initialFocusRef}
    >
      <HStack align="stretch">
        <FormControl isInvalid={invalid} isRequired>
          <FormLabel
            fontWeight={400}
            color={invalid ? "red.500" : "blackAlpha"}
          >
            Image
          </FormLabel>
          <ImageUpload uploadImage={() => Promise.resolve("")} width="100%" />
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
