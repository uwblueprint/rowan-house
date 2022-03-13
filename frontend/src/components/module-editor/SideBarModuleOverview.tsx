import { Button, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import EditorContext from "../../contexts/ModuleEditorContext";
import {
  ContentTypeEnum,
  ModuleEditorParams,
} from "../../types/ModuleEditorTypes";

const SideBarModuleOverview = (): React.ReactElement => {
  const context = useContext(EditorContext);
  const { courseID, moduleID }: ModuleEditorParams = useParams();

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
        module: moduleID,
        title,
        content: [
          {
            type: ContentTypeEnum.TEXT,
            content: {
              text: `Welcome to the new lesson '${title}'!`,
            },
          },
        ],
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
