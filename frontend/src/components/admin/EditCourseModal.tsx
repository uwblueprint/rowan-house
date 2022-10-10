import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import { SwitchInput } from "../common/SwitchInput";
import { TextArea } from "../common/TextArea";
import { CourseResponse } from "../../APIClients/types/CourseClientTypes";
import {
  CREATE_COURSE,
  UPDATE_COURSE,
  UPLOAD_IMAGE,
} from "../../APIClients/mutations/CourseMutations";
import { COURSES } from "../../APIClients/queries/CourseQueries";
import { ReactComponent as ImageIcon } from "../../assets/image_white_outline.svg";

export interface EditCourseModalProps {
  onClose: () => void;
  isOpen: boolean;
  course?: CourseResponse;
}

const refetchQueries = { refetchQueries: [{ query: COURSES }] };

const EditCourseModal = ({
  course,
  onClose,
  isOpen,
}: EditCourseModalProps): React.ReactElement => {
  const [title, setTitle] = useState(course?.title ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [isPrivate, setIsPrivate] = useState(course?.private ?? false);
  const [isHover, setIsHover] = useState<boolean>();
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [previewImagePath, setPreviewImagePath] = useState<
    string | undefined
  >();

  const [updateCourse] = useMutation<CourseResponse>(
    UPDATE_COURSE,
    refetchQueries,
  );
  const [createCourse] = useMutation<CourseResponse>(
    CREATE_COURSE,
    refetchQueries,
  );

  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const onCreateCourse = () => {
    const newCourse = {
      title,
      description,
      private: isPrivate,
      previewImage,
      image: previewImagePath,
    };
    createCourse({ variables: { course: newCourse } });
    onClose();
  };

  const inputFile = React.useRef<HTMLInputElement>(null);

  const openFileBrowser = () => {
    if (inputFile.current) {
      inputFile.current.click();
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
        const result = imageUploadResult.data.uploadImage ?? null;
        setPreviewImage(result?.image ?? undefined);
        setPreviewImagePath(result?.path ?? undefined);
      }
    }
  };

  const onUpdateCourse = () => {
    if (course) {
      const { modules } = course;
      const newCourse = {
        image: previewImagePath,
        previewImage,
        modules,
        title,
        description,
        private: isPrivate,
      };
      updateCourse({ variables: { id: course.id, course: newCourse } });
    } else {
      throw Error("Attempted to update course that doesn't exist");
    }
    onClose();
  };

  return (
    <Modal
      size="lg"
      header="Edit Course"
      onConfirm={course ? onUpdateCourse : onCreateCourse}
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
            cursor="pointer"
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
            enabledName="Public"
            disabledName="Private"
            isEnabled={!isPrivate}
            onChange={(val) => setIsPrivate(!val)}
          />
        </VStack>
        <VStack flex="1">
          <TextInput
            label="Course Name:"
            defaultValue={title}
            onChange={setTitle}
            isRequired
          />
          <TextArea
            label="Course Description:"
            defaultValue={description}
            onChange={setDescription}
            isRequired
          />
          <Box width={8} />
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditCourseModal;
