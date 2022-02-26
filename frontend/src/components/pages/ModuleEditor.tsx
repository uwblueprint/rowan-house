import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ModuleProps } from "../../types/ModuleEditorTypes";
import { dummyLesson, EditorContext } from "../../contexts/ModuleEditorContext";

import SideBar from "../module-editor/SideBar";
import LessonViewer from "../module-editor/LessonViewer";

const ModuleEditor = (): React.ReactElement => {
  const { id }: { id: string } = useParams();

  const dummyModule: ModuleProps = {
    title: "Hello!",
    description: `I am a module ${id}`,
    image: "",
    previewImage: "",
    published: true,
    lessons: ["hash1", "hash2"],
  };

  const [lesson, setLesson] = useState(dummyLesson);

  return (
    <EditorContext.Provider value={{ lesson, setLesson }}>
      <SideBar module={dummyModule} />
      <LessonViewer />
    </EditorContext.Provider>
  );
};

export default ModuleEditor;
