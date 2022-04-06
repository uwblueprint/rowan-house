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
import EditActionsKebabMenu from "../common/EditActionsKebabMenu";
import EditModal from "../common/EditModal";
import DeleteModal from "../common/DeleteModal";

enum ModalType {
  EDIT = "edit",
  DELETE = "delete",
}

const ModulePreview = ({
  title,
  published,
  imageLink,
}: ModulePreviewProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(ModalType.EDIT); // determines which modal is shown when isOpen is true
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);


  const onDeleteClick = () => {
    console.log("OPENING DELETE MODAL"); 
    setModalType(ModalType.DELETE);
    onOpen();
  };
  const onEditClick = () => {
    console.log("OPENING EDIT MODAL");
    setName(title);
    // TODO: set attributes
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
      <Link href="/">
        <Image
          src={imageLink}
          alt="module-preview"
          height="160px"
          width="240px"
          borderTopRadius="6px"
        />
      </Link>
      <Flex ml={4} my={2} justify="space-between">
        <Link href="/" py={2} _hover={{ textDecoration: "none" }} flex="1">
          <VStack spacing={1} align="flex-start">
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
        <EditModal
          type="Module"
          name={name}
          description={description}
          visibility={visibility}
          isOpen={isOpen}
          onConfirm={() => true}
          onCancel={onClose}
        />
      )}
    </Box>
  );
};

export default ModulePreview;
