import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
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
import ImageUpload from "../common/ImageUpload";

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
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [canSubmit, setCanSubmit] = useState(true);

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
      image: previewImage,
    };
    createCourse({ variables: { course: newCourse } });
    onClose();
  };

  const onUpdateCourse = () => {
    if (course) {
      const { modules } = course;
      const newCourse = {
        image: previewImage,
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
            width="100%"
          />
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
