import { createContext } from "react";
import { EditorContextType } from "../types/ModuleEditorTypes";

const EditorContext = createContext<EditorContextType>(null);
export default EditorContext;
