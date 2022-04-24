import React, { useState } from "react";
import {
  Box,
  Flex,
  Link,
  Image,
  Tag,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import EditActionsKebabMenu from "./EditActionsKebabMenu";
import DeleteModal from "../common/DeleteModal";
import EditModuleModal from "./EditModuleModal";
import { ADMIN_MODULE_EDITOR_BASE_ROUTE } from "../../constants/Routes";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import { CourseResponse, Module } from "../../APIClients/types/CourseClientTypes";

const buildEditModuleRoute = (courseId: string, index: number): string =>
  `${ADMIN_MODULE_EDITOR_BASE_ROUTE}/${courseId}/${index}`;

enum ModalType {
  EDIT = "edit",
  DELETE = "delete",
}

interface ModulePreviewProps {
  module: Module;
  courseId: string;
  index: number;
  formatCourseRequest: (module: Module, index: number) => CourseResponse;
}

const ModulePreview = ({
  module,
  courseId,
  index,
  formatCourseRequest,
}: ModulePreviewProps): React.ReactElement => {
  const EDIT_MODULE_ROUTE = buildEditModuleRoute(courseId, index);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(ModalType.EDIT); // determines which modal is shown when isOpen is true
  
  const { title, image, published } = module;

  const onDeleteClick = () => {
    setModalType(ModalType.DELETE);
    onOpen();
  };
  const onEditClick = () => {
    setModalType(ModalType.EDIT);
    onOpen();
  };

  return (
    <Box
      width="240px"
      minHeight="264px"
      className="module-preview"
      borderRadius="6px"
      border="1px"
      borderColor="background.lightgrey"
      boxShadow="base"
    >
      <Link href={EDIT_MODULE_ROUTE}>
        <Image
          src={image || DEFAULT_IMAGE}
          alt="module-preview"
          height="160px"
          width="240px"
          borderTopRadius="6px"
        />
      </Link>
      <Flex ml={4} my={2} justify="space-between">
        <Link
          href={EDIT_MODULE_ROUTE}
          py={2}
          _hover={{ textDecoration: "none", textColor: "text.default" }}
          flex="1"
        >
          <VStack align="flex-start" justify="space-between">
            <Text variant="subheading" noOfLines={2}>
              {title}
            </Text>
            {!published && <Tag colorScheme="cyan">Draft</Tag>}
          </VStack>
        </Link>
        <EditActionsKebabMenu
          handleEditDetailsClick={onEditClick}
          deleteFunction={onDeleteClick}
          showHorizontal={false}
        />
      </Flex>
      {modalType === ModalType.DELETE && (
        <DeleteModal
          name="Module"
          isOpen={isOpen}
          onConfirm={onClose}
          onCancel={onClose}
        />
      )}
      {modalType === ModalType.EDIT && (
        <EditModuleModal
          module={module}
          isOpen={isOpen}
          onClose={onClose}
          formatCourseRequest={(m) => formatCourseRequest(m, index)}
        />
      )}
    </Box>
  );
};

export default ModulePreview;
