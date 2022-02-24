import React from "react";
import { useParams } from "react-router-dom";

const ModuleEditor = (): React.ReactElement => {
  const { id }: { id: string } = useParams();
  return <div>Course Editor for {id} goes here</div>;
};

export default ModuleEditor;
