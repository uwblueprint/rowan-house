import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Link,
  HStack,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, EditIcon } from "@chakra-ui/icons";
import { useMutation, useQuery } from "@apollo/client";
import { ReactComponent as SaveIcon } from "../../assets/Save.svg";
import {
  COURSE_OVERVIEW_BASE_ROUTE,
  MANAGE_COURSES_PAGE,
} from "../../constants/Routes";
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
import {
  CourseResponse,
  ModuleResponse,
  CourseRequest,
  ModuleRequest,
} from "../../APIClients/types/CourseClientTypes";
import { formatLessonRequest } from "../../utils/lessonUtils";
import EditModuleModal from "../common/EditModuleModal";
import EditorTabs from "./EditorTabs";
import ModuleOverview from "./SideBarModuleOverview";
import RouterLink from "../common/RouterLink";
import { GET_COURSE } from "../../APIClients/queries/CourseQueries";

const Sidebar = ({ editable }: { editable: boolean }): React.ReactElement => {
  const {
    moduleIndex: moduleIndexString,
    courseID,
  }: ModuleEditorParams = useParams();
  const moduleIndex = Number(moduleIndexString);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const context: EditorContextType = useContext(EditorContext);

  const { data: courseData, error } = useQuery<{ course: CourseResponse }>(
    GET_COURSE,
    { variables: { id: courseID } },
  );

  const [updateCourse] = useMutation<{ updateCourse: CourseResponse }>(
    UPDATE_COURSE,
    {
      refetchQueries: [
        {
          query: GET_COURSE,
          variables: { id: courseID },
        },
      ],
    },
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

  const formatCourseRequest = (
    newModule?: ModuleRequest,
  ): [string, CourseRequest] => {
    if (!courseData || error)
      throw Error(
        "Attempted to edit module when course does not contain modules",
      );
    let newModules = [];
    // Copy other modules by reference due to the immutability of the data
    if (newModule) {
      // If module index isn't valid, append the new module
      if (
        Number(moduleIndex) >= 0 &&
        Number(moduleIndex) < state.course.modules.length
      ) {
        newModules = state.course.modules.map((oldModule, index) =>
          Number(moduleIndex) === index ? newModule : oldModule,
        );
      } else {
        newModules = [...state.course.modules, newModule];
      }
      // If no new module has been passed, remove the module
    } else {
      newModules = state.course.modules.filter(
        (_, index) => Number(moduleIndex) !== index,
      );
    }

    const { id, ...newCourse } = {
      ...state.course,
      id: courseID,
      modules: newModules,
    };
    return [id, newCourse];
  };

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

  const module = courseData?.course?.modules?.[
    Number(moduleIndex)
  ] as ModuleResponse;

  return (
    <>
      {module && (
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
                backgroundImage={module?.previewImage || undefined}
                backgroundSize="cover"
                bgRepeat="no-repeat"
                opacity="1"
                direction="column"
                justifyContent="space-between"
                p="35px"
              >
                <HStack justify="space-between" align="start">
                  <RouterLink
                    to={
                      editable
                        ? MANAGE_COURSES_PAGE
                        : `${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}`
                    }
                  >
                    <ChevronLeftIcon color="white" h={6} w={6} />
                  </RouterLink>
                  {editable && (
                    <Button
                      variant="md"
                      leftIcon={<EditIcon color="white" h={5} w={5} />}
                      onClick={onOpen}
                      backgroundColor="transparent"
                    />
                  )}
                </HStack>
                <Text variant="display-sm-sb" color="white">
                  {module?.title}
                </Text>
              </Flex>
            </Box>
            {editable ? (
              <>
                <EditorTabs />
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
              </>
            ) : (
              <ModuleOverview editable={editable} />
            )}
          </Flex>
          <EditModuleModal
            module={module}
            isOpen={isOpen}
            onClose={onClose}
            formatCourseRequest={formatCourseRequest}
          />
        </Box>
      )}
    </>
  );
};

export default Sidebar;
