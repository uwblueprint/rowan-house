import React, { ReactElement, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Tag,
  Text,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import ModulePreview from "./ModulePreview";
import { CoursePreviewProps } from "../../types/AdminDashboardTypes";
import EditActionsKebabMenu from "./EditActionsKebabMenu";
import DeleteModal from "../common/DeleteModal";
import EditCourseModal from "../common/EditCourseModal";

enum ModalType {
  EDIT = "edit",
  DELETE = "delete",
}

const CoursePreview = ({
  courseId,
  title,
  description,
  isPrivate,
  modules,
}: CoursePreviewProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(ModalType.EDIT); // determines which modal is shown when isOpen is true
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState(false);

  const onDeleteClick = () => {
    setModalType(ModalType.DELETE);
    onOpen();
  };
  const onEditClick = () => {
    setName(title);
    setDesc(description || "");
    setVisibility(!isPrivate);
    setModalType(ModalType.EDIT);
    onOpen();
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
          handleEditDetailsClick={onEditClick}
          deleteFunction={onDeleteClick}
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
          onClick={() => alert("Create new module")}
        >
          Create New Module
        </Button>
      </Flex>
      <SimpleGrid templateColumns="repeat(auto-fit, 240px)" spacing={4}>
        {modules?.map((module, index) => (
          <ModulePreview
            key={module.id}
            index={index}
            courseId={courseId}
            title={module.title}
            image={module.image}
            published={module.published}
          />
        ))}
      </SimpleGrid>
      {modalType === ModalType.DELETE && (
        <DeleteModal
          name="Course"
          isOpen={isOpen}
          onConfirm={onClose}
          onCancel={onClose}
        />
      )}
      {modalType === ModalType.EDIT && (
        <EditCourseModal
          type="Course"
          name={name}
          description={description || ""}
          visibility={visibility}
          isOpen={isOpen}
          onConfirm={onClose}
          onCancel={onClose}
          setName={setName}
          setDescription={setDesc}
          setVisibility={setVisibility}
        />
      )}
    </Box>
  );
};

export default CoursePreview;
