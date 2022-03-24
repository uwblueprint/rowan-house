import { Button, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import EditorContext from "../../contexts/ModuleEditorContext";
import {
  ModuleEditorParams,
} from "../../types/ModuleEditorTypes";

const SideBarModuleOverview = (): React.ReactElement => {
  const context = useContext(EditorContext);
  const { courseID, moduleIndex }: ModuleEditorParams = useParams();
  const moduleID = parseInt(moduleIndex, 10);

  if (!context) return <></>;
  const { state, dispatch } = context;

  const { lessons, course } = state;
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
      {module.title}
      {module.description}
      <br />
      {orderedLessons.map(
        (lesson, index) =>
          lesson && (
            <Button key={index} onClick={() => setFocus(index)}>
              {lesson.title}
            </Button>
          ),
      )}
      <Button
        onClick={() =>
          createLesson(`Dummy Lesson ${orderedLessons.length + 1}`)
        }
      >
        Create new Lesson
      </Button>
      <p>Should we save? {state.hasChanged ? "yes" : "no"}</p>
    </VStack>
  );
};

export default SideBarModuleOverview;
