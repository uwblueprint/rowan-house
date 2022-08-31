import { createContext } from "react";
import { EditorContextType } from "../types/ModuleEditorTypes";

const EditorContext = createContext<EditorContextType>({
  state: null,
  dispatch: () => {},
});
export default EditorContext;
