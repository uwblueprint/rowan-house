import React, { useCallback, useContext, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  VStack,
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
import { SaveModal } from "../common/SaveModal";
import { GET_COURSE } from "../../APIClients/queries/CourseQueries";

const Sidebar = ({
  editable,
  onLessonSelected,
}: {
  editable: boolean;
  onLessonSelected: () => void;
}): React.ReactElement => {
  const {
    moduleIndex: moduleIndexString,
    courseID,
  }: ModuleEditorParams = useParams();
  const moduleIndex = Number(moduleIndexString);

  const history = useHistory();

  const {
    isOpen: isOpenEditModule,
    onOpen: onOpenEditModule,
    onClose: onCloseEditModule,
  } = useDisclosure();

  const {
    isOpen: isOpenSaveModal,
    onOpen: onOpenSaveModal,
    onClose: onCloseSaveModal,
  } = useDisclosure();

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

  const { state, dispatch } = context;

  const handlePageLeave = useCallback((e: BeforeUnloadEvent) => {
    if (!state?.hasChanged || !Object.values(state.hasChanged).length) {
      return undefined;
    }
    const confirmationMessage = "Some message";
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }, []);

  const cb = useRef<(e: BeforeUnloadEvent) => string | undefined>(
    handlePageLeave,
  );

  useEffect(() => {
    cb.current = handlePageLeave;
  }, [handlePageLeave]);

  useEffect(() => {
    const onUnload = (e: BeforeUnloadEvent) => cb.current?.(e);

    window.addEventListener("beforeunload", onUnload);

    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  if (!state) return <></>;

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
      if (moduleIndex >= 0 && moduleIndex < state.course.modules.length) {
        newModules = state.course.modules.map((oldModule, index) =>
          moduleIndex === index ? newModule : oldModule,
        );
      } else {
        newModules = [...state.course.modules, newModule];
      }
      // If no new module has been passed, remove the module
    } else {
      newModules = state.course.modules.filter(
        (_, index) => moduleIndex !== index,
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
    dispatch({
      type: "update-lesson-id",
      value: { oldID, newID, moduleIndex },
    });
  };

  const saveChanges = async (changeObj: EditorChangeStatuses) => {
    await Promise.all(
      Object.entries(changeObj).map(async ([lessonID, action]) => {
        switch (action) {
          case "CREATE":
            // Await required so we can get a new ID
            await createNewLesson(
              lessonID,
              formatLessonRequest(state.lessons[lessonID]),
            );
            break;
          case "UPDATE":
            updateLesson({
              variables: {
                id: lessonID,
                lesson: formatLessonRequest(state.lessons[lessonID]),
              },
            });
            break;
          case "DELETE":
            deleteLesson({ variables: { id: lessonID } });
            break;
          // Make compiler happy
          default:
            break;
        }
        updateCourse({
          variables: { id: courseID, course: state.course },
        });
      }),
    );
    state.hasChanged = {};
  };

  const module = courseData?.course?.modules?.[moduleIndex] as ModuleResponse;

  const onCoursePageRoute = () => {
    history.push(
      editable
        ? MANAGE_COURSES_PAGE
        : `${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}`,
    );
  };

  const onReturnToCoursePageClick = () => {
    if (Object.values(state.hasChanged).length) {
      onOpenSaveModal();
    } else {
      onCoursePageRoute();
    }
  };

  return (
    <>
      {module && (
        <Box w="20vw" minW="300px">
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
                  <Button
                    variant="md"
                    leftIcon={<ChevronLeftIcon color="white" h={6} w={6} />}
                    onClick={onReturnToCoursePageClick}
                    backgroundColor="transparent"
                  />
                  {editable && (
                    <Button
                      variant="md"
                      leftIcon={<EditIcon color="white" h={5} w={5} />}
                      onClick={onOpenEditModule}
                      backgroundColor="transparent"
                    />
                  )}
                </HStack>
                <VStack align="start">
                  <Text variant="display-xs" color="white">
                    Module {moduleIndex + 1}
                  </Text>
                  <Text variant="display-sm-sb" color="white">
                    {module?.title}
                  </Text>
                </VStack>
              </Flex>
            </Box>
            {editable ? (
              <>
                <EditorTabs onLessonSelected={onLessonSelected} />
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
              <ModuleOverview
                editable={editable}
                onLessonSelected={onLessonSelected}
              />
            )}
          </Flex>
          <SaveModal
            isOpen={isOpenSaveModal}
            onSave={async () => {
              await saveChanges(state.hasChanged);
              onCoursePageRoute();
            }}
            onDontSave={onCoursePageRoute}
            onCancel={onCloseSaveModal}
          />
          <EditModuleModal
            module={module}
            isOpen={isOpenEditModule}
            onClose={onCloseEditModule}
            formatCourseRequest={formatCourseRequest}
          />
        </Box>
      )}
    </>
  );
};

export default Sidebar;
