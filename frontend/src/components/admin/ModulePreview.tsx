import React from "react";
import { Box, Flex, Link, Image, Tag, Text, VStack } from "@chakra-ui/react";
import { ModulePreviewProps } from "../../types/AdminDashboardTypes";
import EditActionsKebabMenu from "../common/EditActionsKebabMenu";

const ModulePreview = ({
  title,
  published,
  imageLink,
}: ModulePreviewProps): React.ReactElement => {
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
      <Link href="/" _hover={{ textDecoration: "none !important" }}>
        <Image
          src={imageLink}
          alt="module-preview"
          htmlHeight="160px"
          htmlWidth="240px"
          borderTopRadius="6px"
        />
      </Link>
      <Flex ml={4} my={2} justify="space-between">
        <Link href="/" py={2}>
          <VStack spacing={1} align="flex-start">
            <Text variant="subheading">{title}</Text>
            {!published && <Tag colorScheme="cyan">Draft</Tag>}
          </VStack>
        </Link>
        <EditActionsKebabMenu
          handleEditDetailsClick={() => alert("edit details")}
          deleteFunction={() => true}
          showHorizontal={false}
        />
      </Flex>
    </Box>
  );
};

export default ModulePreview;
