import React, { useContext } from "react";
import { EditorContext } from "../../contexts/ModuleEditorContext";

import EditableContentBlock from "./EditableContentBlock";

const LessonViewer = (): React.ReactElement => {
  const editorContext = useContext(EditorContext);

  return (
    <div>
      {editorContext.lesson.content.map((x, i) => (
        <EditableContentBlock content={x} key={i} />
      ))}
    </div>
  );
};

export default LessonViewer;
