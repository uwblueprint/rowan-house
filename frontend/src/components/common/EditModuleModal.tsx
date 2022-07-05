import { Box, Flex, VStack, Text } from "@chakra-ui/react";
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
import { TextInput } from "./TextInput";
import { Modal } from "./Modal";
import { SwitchInput } from "./SwitchInput";
import { TextArea } from "./TextArea";
=======
=======
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
>>>>>>> d3a7ed1 (display uploaded image in module preview card):frontend/src/components/admin/EditModuleModal.tsx
import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import { SwitchInput } from "../common/SwitchInput";
import { TextArea } from "../common/TextArea";
>>>>>>> 4b06be6 (display uploaded image on modal):frontend/src/components/admin/EditModuleModal.tsx
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import {
  CourseRequest,
  CourseResponse,
  ModuleResponse,
  ModuleRequest,
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
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
>>>>>>> 0964cb0 (create separate upload module image mutation):frontend/src/components/admin/EditModuleModal.tsx
import { COURSES } from "../../APIClients/queries/CourseQueries";
=======
import {
  COURSES,
  GET_MODULE_IMAGE,
} from "../../APIClients/queries/CourseQueries";
>>>>>>> d3a7ed1 (display uploaded image in module preview card):frontend/src/components/admin/EditModuleModal.tsx
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
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [updateCourse] = useMutation<CourseResponse>(
=======
  const [previewImage, setPreviewImage] = useState<File | null>(null);
=======
  const [previewImage, setPreviewImage] = useState<string | undefined>();
<<<<<<< HEAD:frontend/src/components/common/EditModuleModal.tsx
>>>>>>> 4b65eff (set preview image before updating course):frontend/src/components/admin/EditModuleModal.tsx
=======
  const [imageFile, setImageFile] = useState<string | undefined>();
>>>>>>> 4b06be6 (display uploaded image on modal):frontend/src/components/admin/EditModuleModal.tsx
  const [updateCourse] = useMutation<{ updateCourse: CourseResponse }>(
>>>>>>> 70d4f30 (add file upload logic to courses be and fe):frontend/src/components/admin/EditModuleModal.tsx
    UPDATE_COURSE,
    refetchQueries,
  );
  const [uploadImage] = useMutation(UPLOAD_IMAGE);

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
      const newModule = {
        ...module,
        title,
        description,
        published: isPublished,
        previewImage,
        fileName: imageFile,
      };

      const [id, course] = formatCourseRequest(newModule);
      updateCourse({ variables: { id, course } });
      onClose();
    }
>>>>>>> 0964cb0 (create separate upload module image mutation):frontend/src/components/admin/EditModuleModal.tsx
  };

  const fileChanged = async (e: { target: HTMLInputElement }) => {
    if (e.target.files) {
      const fileSize = e.target.files[0].size / 1024 / 1024;
      if (fileSize > 5) {
        // eslint-disable-next-line no-alert
        window.alert("Your file exceeds 5MB. Upload a smaller file.");
      } else {
        const imageUploadResult = await uploadImage({
          variables: { file: e.target.files[0] },
        });
        const result = imageUploadResult.data.uploadModuleImage ?? null;
        setImageFile(result?.filePath);
        setPreviewImage(result?.previewImage ?? undefined);
      }
    }
  };

  const inputFile = React.useRef<HTMLInputElement>(null);
  const openFileBrowser = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  if (module?.fileName) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery(GET_MODULE_IMAGE, {
      variables: { fileName: module.fileName },
      onCompleted: (data) => {
        setPreviewImage(data.moduleImage);
      },
    });
  }

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
              backgroundImage={previewImage ?? DEFAULT_IMAGE}
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
