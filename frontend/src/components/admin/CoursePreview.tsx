import React from "react";
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
import EditActionsKebabMenu from "../common/EditActionsKebabMenu";
import { Modal } from "../common/Modal";
import DeleteModal from '../common/DeleteModal'

const CoursePreview = ({
  title,
  description,
  isPrivate,
  modules,
}: CoursePreviewProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDeleteClick = () => {
    console.log("OPENING DELETE MODAL");
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
          handleEditDetailsClick={() => alert("Edit detailsssss")}
          deleteFunction={() => alert("Edit details")}
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
        {modules.map((module, index) => (
          <ModulePreview
            key={index}
            title={module.title}
            imageLink={module.imageLink}
            published={module.published}
          />
        ))}
      </SimpleGrid>
      <DeleteModal
        isOpen={isOpen}
        onConfirm={() => true}
        onCancel={onClose}
        name="Course"
      />
    </Box>
  );
};

export default CoursePreview;
