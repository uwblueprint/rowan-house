import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import { SwitchInput } from "../common/SwitchInput";
import { TextArea } from "../common/TextArea";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
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
import {
  COURSES,
  GET_MODULE_IMAGE,
} from "../../APIClients/queries/CourseQueries";
import { ReactComponent as ImageIcon } from "../../assets/image_white_outline.svg";

export interface EditModuleModalProps {
  onClose: () => void;
  isOpen: boolean;
  formatCourseRequest: (module: ModuleRequest) => [string, CourseRequest];
  module?: ModuleResponse;
}

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
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [imageFile, setImageFile] = useState<string | undefined>();
  const [updateCourse] = useMutation<{ updateCourse: CourseResponse }>(
    UPDATE_COURSE,
    refetchQueries,
  );
  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const [isHover, setIsHover] = useState<boolean>();

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
    // eslint-disable-next-line react/jsx-props-no-spreading
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
            isRequired
          />
          <TextArea
            label="Module Description:"
            defaultValue={description}
            onChange={setDescription}
            isRequired
          />
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditModuleModal;
