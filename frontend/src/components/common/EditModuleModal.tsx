import { Flex, VStack, Image } from "@chakra-ui/react";
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
} from "../../APIClients/types/CourseClientTypes";
import { UPDATE_COURSE } from "../../APIClients/mutations/CourseMutations";
import { COURSES, GET_COURSE } from "../../APIClients/queries/CourseQueries";

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

  const [updateCourse] = useMutation<CourseResponse>(
    UPDATE_COURSE,
    refetchQueries,
  );

  const onUpdateModule = () => {
    if (!title || title.length > MAX_TITLE_CHARACTERS) {
      setInvalid(true);
      // title is mandatory field, do not submit if empty
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
    onClose();
  };

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
            isInvalid={invalid}
            isRequired
            helperText={`${title.length}/${MAX_TITLE_CHARACTERS} characters`}
            errorMessage={`${title.length}/${MAX_TITLE_CHARACTERS} characters`}
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
