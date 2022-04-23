import { Box, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import { SwitchInput } from "../common/SwitchInput";
import { TextArea } from "../common/TextArea";
import { CourseResponse } from "../../APIClients/types/CourseClientTypes";
import { UPDATE_COURSE } from "../../APIClients/mutations/CourseMutations";

export interface EditCourseModalProps {
  course: CourseResponse;
  onClose: () => void;
  isOpen: boolean;
}

const EditCourseModal: React.FC<EditCourseModalProps> = (props) => {
  const { course, onClose, isOpen } = props;
  const [title, setTitle] = useState(course.title ?? "");
  const [description, setDescription] = useState(course.description ?? "");
  const [isPrivate, setIsPrivate] = useState(course.private ?? false);
  const [updateCourse] = useMutation<CourseResponse>(UPDATE_COURSE);

  const onConfirmClick = () => {
    const { image, previewImage, modules } = course;
    const newCourse = {
      image,
      previewImage,
      modules,
      title,
      description,
      private: isPrivate,
    };
    updateCourse({ variables: { id: course.id, course: newCourse } });
    onClose();
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal
      size="lg"
      header="Edit Course"
      onConfirm={onConfirmClick}
      onCancel={onClose}
      isOpen={isOpen}
    >
      <VStack>
        <TextInput
          name="Course Name:"
          label="Course Name:"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          isRequired
        />
        <TextArea
          name="Course Description:"
          label="Course Description:"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          isRequired
        />
        <SwitchInput
          name={`Visibility: ${!isPrivate ? "Public" : "Private"}`}
          enabledName="Public"
          disabledName="Private"
          isEnabled={!isPrivate}
          onChange={(e) => setIsPrivate(!e.target.checked)}
        />
        <Box width={8} />
      </VStack>
    </Modal>
  );
};

export default EditCourseModal;
