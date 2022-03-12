import { Button, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";

import { EditorContext } from "../../contexts/ModuleEditorContext";
import { ModuleProps } from "../../types/ModuleEditorTypes";

const SideBarModuleOverview = ({
  module,
}: {
  module: ModuleProps;
}): React.ReactElement => {
  const editorContext = useContext(EditorContext);

  const lessons = module.lessons.map((id) => editorContext.lessons[id]);
  const { setFocusedLesson } = editorContext;

  return (
    <VStack>
      {module.title}
      {module.description}
      <br />
      {lessons.map((lesson, index) => (
        <Button
          key={index}
          onClick={() => setFocusedLesson(module.lessons[index])}
        >
          {lesson.title}
        </Button>
      ))}
    </VStack>
  );
};

export default SideBarModuleOverview;
