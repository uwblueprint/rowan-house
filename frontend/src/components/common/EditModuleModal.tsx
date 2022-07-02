import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { TextInput } from "./TextInput";
import { Modal } from "./Modal";
import { SwitchInput } from "./SwitchInput";
import { TextArea } from "./TextArea";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import {
  CourseRequest,
  CourseResponse,
  ModuleResponse,
  ModuleRequest,
  ImageUploadResponse,
} from "../../APIClients/types/CourseClientTypes";
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
import { UPDATE_COURSE } from "../../APIClients/mutations/CourseMutations";
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
import { COURSES, GET_COURSE } from "../../APIClients/queries/CourseQueries";
=======
=======
import {
  UPDATE_COURSE,
  UPLOAD_IMAGE,
} from "../../APIClients/mutations/CourseMutations";
>>>>>>> 0964cb0 (create separate upload module image mutation):frontend/src/components/admin/EditModuleModal.tsx
import { COURSES } from "../../APIClients/queries/CourseQueries";
import { ReactComponent as ImageIcon } from "../../assets/image_white_outline.svg";
>>>>>>> 70d4f30 (add file upload logic to courses be and fe):frontend/src/components/admin/EditModuleModal.tsx

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
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [updateCourse] = useMutation<CourseResponse>(
=======
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [updateCourse] = useMutation<{ updateCourse: CourseResponse }>(
>>>>>>> 70d4f30 (add file upload logic to courses be and fe):frontend/src/components/admin/EditModuleModal.tsx
    UPDATE_COURSE,
    refetchQueries,
  );
  const [uploadImage] = useMutation<{ uploadImage: ImageUploadResponse }>(
    UPLOAD_IMAGE,
  );

  const [isHover, setIsHover] = useState<boolean>();

<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
  const onUpdateModule = () => {
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
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
    const newModule = { ...module, title, description, published: isPublished };
    const [id, course] = formatCourseRequest(newModule);
    updateCourse({
      variables: { id, course },
      refetchQueries: [
        { query: COURSES },
        { query: GET_COURSE, variables: { id } },
      ],
    });
    setInvalid(false);
=======
    const newModule = {
      ...module,
      title,
      description,
      published: isPublished,
      file: previewImage,
    };
    const [id, course] = formatCourseRequest(newModule);
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
    updateCourse({ variables: { id, course, file: previewImage } });
>>>>>>> 70d4f30 (add file upload logic to courses be and fe):frontend/src/components/admin/EditModuleModal.tsx
=======
    updateCourse({ variables: { id, course } });
>>>>>>> 8695160 (file upload for modules not course):frontend/src/components/admin/EditModuleModal.tsx
    onClose();
=======
  const onUpdateModule = async () => {
    if (previewImage) {
      const imageUploadResult = await uploadImage({
        variables: { file: previewImage },
      });

      const newModule = {
        ...module,
        title,
        description,
        published: isPublished,
        fileName: imageUploadResult.data?.uploadImage.fileName,
      };

      const [id, course] = formatCourseRequest(newModule);
      updateCourse({ variables: { id, course } });
      onClose();
    }
>>>>>>> 0964cb0 (create separate upload module image mutation):frontend/src/components/admin/EditModuleModal.tsx
  };

  const fileChanged = (e: { target: HTMLInputElement }) => {
    if (e.target.files) {
      const fileSize = e.target.files[0].size / 1024 / 1024;
      if (fileSize > 5) {
        // eslint-disable-next-line no-alert
        window.alert("Your file exceeds 5MB. Upload a smaller file.");
      } else {
        setPreviewImage(e.target.files[0]);
      }
    }
  };

  const inputFile = React.useRef<HTMLInputElement>(null);
  const openFileBrowser = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  return (
    <Modal
      size="xl"
      header="Edit Module"
      onConfirm={onUpdateModule}
      onCancel={onClose}
      isOpen={isOpen}
    >
      <Flex>
        <VStack flex="1" pr="1rem">
          <Box
            borderRadius=".5rem"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            _hover={{
              background: "black",
              opacity: 0.9,
            }}
            onClick={openFileBrowser}
          >
            <Flex
              backgroundImage={DEFAULT_IMAGE}
              backgroundPosition="center"
              h="214px"
              w="214px"
              bgRepeat="no-repeat"
              direction="column"
              backgroundSize="cover"
              opacity="1"
              justifyContent="center"
              borderRadius=".5rem"
              alignItems="center"
            >
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputFile}
                onChange={fileChanged}
                accept="image/*"
              />
              {isHover && (
                <>
                  <ImageIcon color="white" style={{ marginBottom: "1rem" }} />
                  <Text variant="caption" color="white">
                    Upload image
                  </Text>
                </>
              )}
            </Flex>
          </Box>
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
