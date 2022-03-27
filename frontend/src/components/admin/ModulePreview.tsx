import React from "react";
import { Box, Flex, Link, Image, Tag, Text, VStack } from "@chakra-ui/react";
import { ModulePreviewProps } from "../../types/AdminDashboardTypes";
import EditActionsKebabMenu from "./EditActionsKebabMenu";
import { ADMIN_MODULE_EDITOR_BASE_ROUTE } from "../../constants/Routes";
import { DEFAULT_IMAGE } from "../../constants/DummyData";

const buildEditModuleRoute = (courseId: string, index: number): string =>
  `${ADMIN_MODULE_EDITOR_BASE_ROUTE}/${courseId}/${index}`;

const ModulePreview = ({
  index,
  courseId,
  title,
  published,
  image,
}: ModulePreviewProps): React.ReactElement => {
  const EDIT_MODULE_ROUTE = buildEditModuleRoute(courseId, index);

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
          handleEditDetailsClick={() => alert("edit details")}
          deleteFunction={() => true}
          showHorizontal={false}
        />
      </Flex>
    </Box>
  );
};

export default ModulePreview;
