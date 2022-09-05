import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import { ModuleEditorParams } from "../../types/ModuleEditorTypes";
import EditorContext from "../../contexts/ModuleEditorContext";
import { HOME_PAGE } from "../../constants/Routes";
import UpNext from "./UpNext";

const ModuleCompleted = (): React.ReactElement => {
  const history = useHistory();
  const {
    courseID,
    moduleIndex: moduleIndexString,
  } = useParams<ModuleEditorParams>();
  const moduleIndex = Number(moduleIndexString);
  const context = useContext(EditorContext);
  const { state } = context;
  if (!state) return <></>;

  const { course } = state;
  const module = course.modules[moduleIndex];
  return (
    <Flex w="100%" direction="column">
      <VStack align="start" px="154px" pt="20px" spacing="20px">
        <Heading as="h1" size="xl" color="brand.royal">
          Congratulations!
        </Heading>
        <Text variant="body">
          You have completed{" "}
          <Text as="span" variant="body-bold">
            Module {moduleIndex + 1}: {module.title}
          </Text>{" "}
          of{" "}
          <Text as="span" variant="body-bold">
            {course.title}
          </Text>
          .
        </Text>
        <UpNext
          courseID={courseID}
          moduleIndex={moduleIndex}
          modules={course.modules}
        />
        <Heading as="h2" size="lg" fontWeight="normal">
          Course Progress
        </Heading>
        {/* TODO insert course progress section */}
        <Text variant="body" alignSelf="center">
          Interested in something else?
        </Text>
        <Button alignSelf="center" onClick={() => history.push(HOME_PAGE)}>
          Browse Courses
        </Button>
      </VStack>
    </Flex>
  );
};

export default ModuleCompleted;
