import { Button, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleEditorParams } from "../../types/ModuleEditorTypes";

const SideBarModuleOverview = (): React.ReactElement => {
  const context = useContext(EditorContext);
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();
  const moduleID = parseInt(moduleIndex, 10);

  if (!context) return <></>;
  const { state, dispatch } = context;

  const { lessons, course, focusedLesson } = state;
  const module = course.modules[moduleID];

  const orderedLessons = module.lessons.map((id) => lessons[id]);

  const setFocus = (index: number) =>
    dispatch({ type: "set-focus", value: module.lessons[index] });

  const createLesson = (title: string) =>
    dispatch({
      type: "create-lesson",
      value: {
        course: courseID,
        module: course.modules[moduleID].id,
        title,
        content: [],
      },
    });

  return (
    <VStack>
      {focusedLesson &&
        orderedLessons.map((lesson, index) =>
          state.lessons[focusedLesson] === lesson ? (
            lesson && (
              <Button
                key={index}
                onClick={() => setFocus(index)}
                variant="unstyled"
                borderLeftColor="brand.royal"
                borderLeftWidth="5px"
                borderRadius="0"
                bg="background.light"
                textAlign="left"
                pl="30px"
                minH="55px"
                w="100%"
              >
                {lesson.title}
              </Button>
            )
          ) : (
            <Button
              key={index}
              onClick={() => setFocus(index)}
              variant="unstyled"
              textAlign="left"
              pl="35px"
              minH="55px"
              w="100%"
            >
              {lesson.title}
            </Button>
          ),
        )}
      <Button
        onClick={() =>
          createLesson(`Dummy Lesson ${orderedLessons.length + 1}`)
        }
        color="brand.royal"
        variant="unstyled"
        leftIcon={<AddIcon />}
        textAlign="left"
        pl="35px"
        minH="55px"
        w="100%"
      >
        New Lesson
      </Button>
    </VStack>
  );
};

export default SideBarModuleOverview;
