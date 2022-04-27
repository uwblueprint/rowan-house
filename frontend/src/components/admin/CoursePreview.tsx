import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Tag,
  Text,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";

import ModulePreview from "./ModulePreview";
import EditActionsKebabMenu from "./EditActionsKebabMenu";
import DeleteModal from "../common/DeleteModal";
import EditCourseModal from "./EditCourseModal";
import {
  CourseRequest,
  CourseResponse,
  ModuleRequest,
} from "../../APIClients/types/CourseClientTypes";
import EditModuleModal from "./EditModuleModal";
import { DELETE_COURSE } from "../../APIClients/mutations/CourseMutations";
import { COURSES } from "../../APIClients/queries/CourseQueries";

enum ModalType {
  EDIT = "edit",
  DELETE = "delete",
  CREATE_MODULE = "create-module",
}

interface CoursePreviewProps {
  course: CourseResponse;
}

const refetchQueries = { refetchQueries: [{ query: COURSES }] };

const CoursePreview = ({ course }: CoursePreviewProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(ModalType.EDIT); // determines which modal is shown when isOpen is true
  const { title, description, modules, private: isPrivate } = course;

  const [deleteCourse] = useMutation(DELETE_COURSE, refetchQueries);

  const onClick = (type: ModalType) => {
    setModalType(type);
    onOpen();
  };
  const onDelete = () => {
    const { id } = course;
    deleteCourse({ variables: { id } });
    onClose();
  };

  const formatCourseRequest = (
    moduleIndex: number,
    newModule?: ModuleRequest,
  ): [string, CourseRequest] => {
    if (!course.modules)
      throw Error(
        "Attempted to edit module when course does not contain modules",
      );
    let newModules = [];
    // Copy other modules by reference due to the immutability of the data
    if (newModule) {
      // If module index isn't valid, append the new module
      if (moduleIndex >= 0 && moduleIndex < course.modules.length)
        newModules = course.modules.map((oldModule, index) =>
          moduleIndex === index ? newModule : oldModule,
        );
      else newModules = [...course.modules, newModule];
      // If no new module has been passed, remove the module
    } else {
      newModules = course.modules.filter((_, index) => moduleIndex !== index);
    }

    const { id, ...newCourse } = { ...course, modules: newModules };
    return [id, newCourse];
  };

  return (
    <Box
      className="course-preview"
      width="100%"
      p={6}
      border="2px"
      borderColor="brand.royal"
      borderStyle="solid"
      borderRadius="6px"
    >
      <Flex justify="space-between">
        <Flex align="center">
          <Text variant="display-sm-sb">{title}</Text>
          {isPrivate && (
            <Tag
              px={6}
              py="2px"
              ml={6}
              lineHeight={7}
              border="1px"
              borderColor="background.grey"
              borderStyle="solid"
            >
              Private
            </Tag>
          )}
        </Flex>
        <EditActionsKebabMenu
          handleEditDetailsClick={() => onClick(ModalType.EDIT)}
          deleteFunction={() => onClick(ModalType.DELETE)}
          showHorizontal
        />
      </Flex>
      <Text variant="body" py={3}>
        {description}
      </Text>
      <Flex className="module-title" my={6} align="center">
        <Text variant="heading">Modules</Text>
        <Button
          variant="outline-sm"
          ml={6}
          onClick={() => onClick(ModalType.CREATE_MODULE)}
        >
          Create New Module
        </Button>
      </Flex>
      <SimpleGrid templateColumns="repeat(auto-fit, 240px)" spacing={4}>
        {modules?.map((module, index) => (
          <ModulePreview
            key={module.id}
            courseId={course.id}
            module={module}
            index={index}
            formatCourseRequest={formatCourseRequest}
          />
        ))}
      </SimpleGrid>
      {modalType === ModalType.DELETE && (
        <DeleteModal
          name="Course"
          isOpen={isOpen}
          onConfirm={onDelete}
          onCancel={onClose}
        />
      )}
      {modalType === ModalType.EDIT && (
        <EditCourseModal course={course} isOpen={isOpen} onClose={onClose} />
      )}
      {modalType === ModalType.CREATE_MODULE && (
        <EditModuleModal
          isOpen={isOpen}
          onClose={onClose}
          formatCourseRequest={(m) => formatCourseRequest(-1, m)}
        />
      )}
    </Box>
  );
};

export default CoursePreview;
