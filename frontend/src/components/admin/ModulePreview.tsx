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
import { ModulePreviewProps } from "../../types/AdminDashboardTypes";
import EditActionsKebabMenu from "./EditActionsKebabMenu";
import DeleteModal from "../common/DeleteModal";
import EditModuleModal from "./EditModuleModal";
import { ADMIN_MODULE_EDITOR_BASE_ROUTE } from "../../constants/Routes";
import { DEFAULT_IMAGE } from "../../constants/DummyData";

const buildEditModuleRoute = (courseId: string, index: number): string =>
  `${ADMIN_MODULE_EDITOR_BASE_ROUTE}/${courseId}/${index}`;

enum ModalType {
  EDIT = "edit",
  DELETE = "delete",
}

const ModulePreview = ({
  index,
  courseId,
  title,
  published,
  image,
}: ModulePreviewProps): React.ReactElement => {
  const EDIT_MODULE_ROUTE = buildEditModuleRoute(courseId, index);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(ModalType.EDIT); // determines which modal is shown when isOpen is true
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);


  const onDeleteClick = () => {
    setModalType(ModalType.DELETE);
    onOpen();
  };
  const onEditClick = () => {
    setName(title);
    // description??
    setVisibility(published);
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
          onConfirm={() => true}
          onCancel={onClose}
        />
      )}
      {modalType === ModalType.EDIT && (
        <EditModuleModal
          type="Module"
          name={name}
          description={description}
          visibility={visibility}
          isOpen={isOpen}
          onConfirm={() => true}
          onCancel={onClose}
          setName={setName}
          setDescription={setDescription}
          setVisibility={setVisibility}
        />
      )}
    </Box>
  );
};

export default ModulePreview;
