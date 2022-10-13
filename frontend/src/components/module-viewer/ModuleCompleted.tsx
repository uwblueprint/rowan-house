import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { ModuleEditorParams } from "../../types/ModuleEditorTypes";
import EditorContext from "../../contexts/ModuleEditorContext";
import { HOME_PAGE } from "../../constants/Routes";
import UpNext from "./UpNext";
import ModuleDropdowns from "../learner/ModuleDropdowns";
import { GET_COURSE } from "../../APIClients/queries/CourseQueries";
import { GET_MODULE_PROGRESS } from "../../APIClients/queries/ProgressQueries";
import AuthContext from "../../contexts/AuthContext";

const ModuleCompleted = (): React.ReactElement => {
  const history = useHistory();
  const {
    courseID,
    moduleIndex: moduleIndexString,
  } = useParams<ModuleEditorParams>();
  const { authenticatedUser } = useContext(AuthContext);
  const moduleIndex = Number(moduleIndexString);

  const { data: courseData } = useQuery(GET_COURSE, {
    variables: {
      id: courseID,
    },
  });

  const { data: moduleProgress } = useQuery(GET_MODULE_PROGRESS, {
    variables: {
      userId: authenticatedUser?.id,
      courseId: courseID,
    },
  });

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
          courseImage={courseData?.course?.previewImage}
          moduleIndex={moduleIndex}
          modules={course.modules}
        />
        <Text variant="heading">Course Progress</Text>
        <ModuleDropdowns
          modules={courseData?.course?.modules}
          progress={moduleProgress}
          courseID={courseID}
        />
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
