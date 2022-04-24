import { Flex, VStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { TextInput } from "../common/TextInput";
import { Modal } from "../common/Modal";
import { SwitchInput } from "../common/SwitchInput";
import { TextArea } from "../common/TextArea";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import { CourseRequest, CourseResponse, ModuleResponse, ModuleRequest } from "../../APIClients/types/CourseClientTypes";
import { UPDATE_COURSE } from "../../APIClients/mutations/CourseMutations";
import { COURSES } from "../../APIClients/queries/CourseQueries";

export interface EditModuleModalProps {
  onClose: () => void;
  isOpen: boolean;
  formatCourseRequest: (module: ModuleRequest) => [string, CourseRequest];
  module?: ModuleResponse;
}

const refetchQueries = {refetchQueries: [ { query: COURSES } ]}

const EditModuleModal = ({ module, formatCourseRequest, isOpen, onClose }: EditModuleModalProps) => {  
  const [title, setTitle] = useState(module?.title ?? "");
  const [isPublished, setVisibility] = useState(module?.published ?? false);
  const [description, setDescription] = useState(module?.description ?? "");
  
  const [updateCourse] = useMutation<CourseResponse>(UPDATE_COURSE, refetchQueries);

  const onUpdateModule = () => {
    const newModule = {...module, title, description, published: isPublished};
    const [id, course] = formatCourseRequest(newModule);
    updateCourse({ variables: { id, course } });
    onClose();
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal
      size="xl" header="Edit Module"
      onConfirm={onUpdateModule}
      onCancel={onClose}
      isOpen={isOpen}>
      <Flex>
        <VStack flex="1" pr="1rem">
          <Image src={DEFAULT_IMAGE} borderRadius=".5rem" />
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
