import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Link,
  Image,
  Tag,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
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

  const history = useHistory();
  const navigateToEditModuleRoute = () => history.push(EDIT_MODULE_ROUTE);

  return (
    <Flex
      width="240px"
      height="264px"
      className="module-preview"
      justify="space-between"
      direction="column"
      borderRadius="6px"
      border="1px background.lightgrey solid"
      boxShadow="base"
    >
      <Link
        href={EDIT_MODULE_ROUTE}
        _hover={{ textDecoration: "none", textColor: "text.default" }}
        flex="1"
      >
        <Image
          src={image || DEFAULT_IMAGE}
          alt="module-preview"
          height="160px"
          width="240px"
          borderTopRadius="6px"
        />
        <HStack
          align="flex-start"
          justify="space-between"
          m={2}
          flexGrow="1"
        >
          <VStack align="flex-start" justify="space-between" height="100%" p={2}>
            <Text variant="subheading" noOfLines={2}>
              {title}
            </Text>
            {!published && <Tag colorScheme="cyan">Draft</Tag>}
          </VStack>
          <EditActionsKebabMenu
            handleEditDetailsClick={() => alert("edit details")}
            deleteFunction={() => true}
            showHorizontal={false}
          />
        </HStack>
      </Link>
    </Flex>
  );
};

export default ModulePreview;
