import React, { useRef, useState } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { TextInput } from "./TextInput";
import { Modal } from "./Modal";
import { SwitchInput } from "./SwitchInput";
import { TextArea } from "./TextArea";
import {
  CourseRequest,
  CourseResponse,
  ModuleResponse,
  ModuleRequest,
} from "../../APIClients/types/CourseClientTypes";
import {
  UPDATE_COURSE,
  UPLOAD_IMAGE,
} from "../../APIClients/mutations/CourseMutations";
import { COURSES, GET_COURSE } from "../../APIClients/queries/CourseQueries";
import ImageUpload from "./ImageUpload";

export interface EditModuleModalProps {
  onClose: () => void;
  isOpen: boolean;
  formatCourseRequest: (module: ModuleRequest) => [string, CourseRequest];
  module?: ModuleResponse;
}

const MAX_TITLE_CHARACTERS = 50; // maximum # of characters in the title

const refetchQueries = { refetchQueries: [{ query: COURSES }] };

const EditModuleModal = ({
  module,
  formatCourseRequest,
  isOpen,
  onClose,
}: EditModuleModalProps): React.ReactElement => {
  const [title, setTitle] = useState(module?.title ?? "");
  const [isPublished, setVisibility] = useState(module?.published ?? false);
  const [description, setDescription] = useState(module?.description ?? "");
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const [updateCourse] = useMutation<CourseResponse>(
    UPDATE_COURSE,
    refetchQueries,
  );
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const resetModal = () => {
    setDescription("");
    setTitle("");
    setErrorMessage("");
    setPreviewImage(undefined);
    setInvalid(false);
    setLoading(false);
  };

  const onUpdateModule = async () => {
    if (!title || title.length > MAX_TITLE_CHARACTERS) {
      setInvalid(true);
      // title is mandatory field, do not submit if empty or exceed max char
      setErrorMessage(
        !title
          ? "This field is required"
          : `Exceed max length of ${MAX_TITLE_CHARACTERS} characters`,
      );
      return;
    }

    setLoading(true);

    const newModule = {
      ...module,
      title,
      description,
      published: isPublished,
      image: previewImage,
    };
    const [id, course] = formatCourseRequest(newModule);
    await updateCourse({
      variables: { id, course },
      refetchQueries: [
        { query: COURSES },
        { query: GET_COURSE, variables: { id } },
      ],
    });

    resetModal();
    onClose();
  };

  const initialFocusRef = useRef(null);

  return (
    <Modal
      size="xl"
      header="Edit Module"
      onConfirm={onUpdateModule}
      onCancel={onClose}
      isOpen={isOpen}
      confirmIsLoading={loading}
      initialFocusRef={initialFocusRef}
      canSubmit={canSubmit}
    >
      <Flex>
        <VStack flex="1" pr="1rem">
          <ImageUpload
            uploadImage={async (file) => {
              setCanSubmit(false);
              const result = await uploadImage({ variables: { file } });
              const { image, path } = result.data.uploadImage || {};
              setPreviewImage(path);
              setCanSubmit(true);
              return image;
            }}
          />
          <SwitchInput
            enabledName="Published"
            disabledName="Draft"
            isEnabled={isPublished}
            isSpaced={false}
            onChange={setVisibility}
          />
        </VStack>
        <VStack flex="1">
          <TextInput
            ref={initialFocusRef}
            label="Module Name:"
            defaultValue={title}
            onChange={setTitle}
            isInvalid={invalid}
            isRequired
            helperText={`${title.length}/${MAX_TITLE_CHARACTERS} characters`}
            errorMessage={errorMessage}
          />
          <TextArea
            label="Module Description:"
            defaultValue={description}
            onChange={setDescription}
          />
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditModuleModal;
