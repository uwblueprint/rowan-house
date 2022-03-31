import React from "react";
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
import { Modal } from "../common/Modal";
import DeleteModal from '../common/DeleteModal'

const ModulePreview = ({
  title,
  published,
  imageLink,
}: ModulePreviewProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDeleteClick = () => {
    console.log("OPENING DELETE MODAL");
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
          handleEditDetailsClick={() => alert("edit detailss")}
          deleteFunction={onDeleteClick}
          showHorizontal={false}
        />
      </Flex>
      <DeleteModal
        isOpen={isOpen}
        onConfirm={() => true}
        onCancel={onClose}
        name="Course"
      />
    </Box>
  );
};

export default ModulePreview;
