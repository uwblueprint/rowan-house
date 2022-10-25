import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";

import ImageUpload from "../../../common/ImageUpload";
import { Modal } from "../../../common/Modal";
import { TextArea } from "../../../common/TextArea";
import { ImageBlockState } from "../../../../types/ContentBlockTypes";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import { UPLOAD_IMAGE } from "../../../../APIClients/mutations/CourseMutations";

const DEFAULT_MAX_SIZE = 250;

const EditImageModal = ({
  block: { content },
  isOpen,
  onCancel,
  onSave,
}: EditContentModalProps<ImageBlockState>): React.ReactElement => {
  const [path, setPath] = useState(content.path);
  const [description, setDescription] = useState(content.description);
  const [maxSize, setMaxSize] = useState(content.maxSize || DEFAULT_MAX_SIZE);
  const [invalid, setInvalid] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  useEffect(() => {
    setPath(content.path);
    setDescription(content.description);
    setMaxSize(content.maxSize || DEFAULT_MAX_SIZE);
  }, [isOpen, content]);

  const onConfirm = () => {
    if (!description) {
      setInvalid(true);
      return;
    }
    onSave({
      path,
      description,
      maxSize,
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
      <VStack align="stretch" spacing={5}>
        <HStack align="stretch">
          <FormControl display="flex" flexDirection="column">
            <FormLabel fontWeight={400} htmlFor="uploadContentImage">
              Image
            </FormLabel>
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
              id="uploadContentImage"
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
        <FormControl display="flex" flexDirection="column">
          <FormLabel fontWeight={400} htmlFor="contentImageMaxSize">
            Size
          </FormLabel>
          <NumberInput
            step={5}
            min={50}
            max={750}
            value={maxSize}
            onChange={(value) => setMaxSize(+value)}
            id="contentImageMaxSize"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </VStack>
    </Modal>
  );
};

export default EditImageModal;
