import { Box, VStack } from "@chakra-ui/react";
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
} from "../../APIClients/mutations/CourseMutations";
import { COURSES } from "../../APIClients/queries/CourseQueries";

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

  const [updateCourse] = useMutation<CourseResponse>(
    UPDATE_COURSE,
    refetchQueries,
  );
  const [createCourse] = useMutation<CourseResponse>(
    CREATE_COURSE,
    refetchQueries,
  );

  const onCreateCourse = () => {
    const newCourse = { title, description, private: isPrivate };
    createCourse({ variables: { course: newCourse } });
    onClose();
  };

  const onUpdateCourse = () => {
    if (course) {
      const { image, previewImage, modules } = course;
      const newCourse = {
        image,
        previewImage,
        modules,
        title,
        description,
        private: isPrivate,
      };
      console.log(newCourse);
      updateCourse({ variables: { id: course.id, course: newCourse } });
    } else {
      throw Error("Attempted to update course that doesn't exist");
    }
    onClose();
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal
      size="lg"
      header="Edit Course"
      onConfirm={course ? onUpdateCourse : onCreateCourse}
      onCancel={onClose}
      isOpen={isOpen}
    >
      <VStack>
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
        <SwitchInput
          enabledName="Public"
          disabledName="Private"
          isEnabled={!isPrivate}
          onChange={(val) => setIsPrivate(!val)}
        />
        <Box width={8} />
      </VStack>
    </Modal>
  );
};

export default EditCourseModal;
