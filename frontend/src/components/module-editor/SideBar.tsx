import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Link,
  HStack,
  Spacer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";

import ModuleOverview from "./SideBarModuleOverview";
import ContentKiosk from "./SideBarContentKiosk";
import { ReactComponent as SaveIcon } from "../../assets/Save.svg";
import { MANAGE_COURSES_PAGE } from "../../constants/Routes";
import EditorContext from "../../contexts/ModuleEditorContext";
import {
  EditorChangeStatuses,
  EditorContextType,
  ModuleEditorParams,
} from "../../types/ModuleEditorTypes";
import {
  CREATE_LESSON,
  UPDATE_LESSON,
  DELETE_LESSON,
} from "../../APIClients/mutations/LessonMutations";
import { UPDATE_COURSE } from "../../APIClients/mutations/CourseMutations";
import {
  LessonRequest,
  LessonResponse,
} from "../../APIClients/types/LessonClientTypes";
import { CourseResponse } from "../../APIClients/types/CourseClientTypes";
import { formatLessonRequest } from "../../utils/lessonUtils";

const Sidebar = (): React.ReactElement => {
  const { moduleIndex }: ModuleEditorParams = useParams();

  const context: EditorContextType = useContext(EditorContext);
  const [updateCourse] = useMutation<{ updateCourse: CourseResponse }>(
    UPDATE_COURSE,
  );
  const [updateLesson] = useMutation<{ updateLesson: LessonResponse }>(
    UPDATE_LESSON,
  );
  const [createLesson] = useMutation<{ createLesson: LessonResponse }>(
    CREATE_LESSON,
  );
  const [deleteLesson] = useMutation(DELETE_LESSON);

  if (!context) return <></>;
  const { state, dispatch } = context;

  const createNewLesson = async (
    oldID: string,
    changedLesson: LessonRequest,
  ) => {
    const { data } = await createLesson({
      variables: { lesson: changedLesson },
    });
    if (!data) throw Error("Failed to create new lesson");
    const lesson = data.createLesson;
    const { id: newID } = lesson;
    // Update lesson ID in state with response
    dispatch({ type: "update-lesson-id", value: { oldID, newID } });
  };

  const saveChanges = async (changeObj: EditorChangeStatuses) => {
    Object.entries(changeObj).forEach(async ([doc_id, action]) => {
      const changedLesson = formatLessonRequest(state.lessons[doc_id]);
      switch (action) {
        case "CREATE":
          // Await required so we can get a new ID
          await createNewLesson(doc_id, changedLesson);
          break;
        case "UPDATE":
          updateLesson({ variables: { id: doc_id, lesson: changedLesson } });
          break;
        case "DELETE":
          deleteLesson({ variables: { id: doc_id } });
          break;
        // Make compiler happy
        default:
          break;
      }
      updateCourse({
        variables: { id: changedLesson.course, course: state.course },
      });
    });
    state.hasChanged = {};
  };

  return (
    <Box w="20%" minW="300px">
      <Flex
        position="fixed"
        w="inherit"
        minW="inherit"
        h="100vh"
        overflow="hidden"
        boxShadow="xl"
        flexFlow="column"
      >
        <Box opacity="0.9" backgroundColor="black">
          <Flex
            h="240px"
            backgroundPosition="center"
            backgroundImage={
              state.course.modules[Number(moduleIndex)].previewImage
            }
            backgroundSize="cover"
            bgRepeat="no-repeat"
            opacity="1"
            direction="column"
            justifyContent="space-between"
            p="35px"
          >
            <HStack justify="space-between">
              <Link href={MANAGE_COURSES_PAGE}>
                <ChevronLeftIcon color="white" h={6} w={6} />
              </Link>
              <EditIcon color="white" h={5} w={5} />
            </HStack>
            <Text variant="display-sm-sb" color="white">
              {state.course.modules[Number(moduleIndex)].title}
            </Text>
          </Flex>
        </Box>
        <Tabs variant="unstyled" height="100%" overflowY="hidden">
          <Box
            bg="background.light"
            borderRadius="md"
            p="6px"
            margin="auto"
            maxW="min-content"
            my="43px"
          >
            <TabList>
              <Tab
                style={{ paddingInline: "35px", height: "32px" }}
                _selected={{
                  color: "white",
                  bg: "brand.royal",
                  borderRadius: "md",
                }}
              >
                Overview
              </Tab>
              <Tab
                style={{ paddingInline: "23px", height: "32px" }}
                _selected={{
                  color: "white",
                  bg: "brand.royal",
                  borderRadius: "md",
                }}
              >
                Components
              </Tab>
            </TabList>
          </Box>
          <TabPanels height="100%" overflowY="hidden">
            <TabPanel
              p="0"
              pb="200px"
              height="100%"
              overflowY="auto"
              className="tabScroll"
            >
              <ModuleOverview />
            </TabPanel>
            <TabPanel
              pb="200px"
              height="100%"
              overflowY="auto"
              className="tabScroll"
            >
              <ContentKiosk />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Spacer />
        {Object.values(state.hasChanged).length ? (
          <Button
            bg="#5FCA89"
            color="white"
            leftIcon={<SaveIcon />}
            borderRadius="0"
            pl="35px"
            width="100%"
            h="55px"
            justifyContent="left"
            onClick={() => saveChanges(state.hasChanged)}
          >
            Save Changes
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
