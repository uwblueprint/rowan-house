import { ContentType } from "../../../../APIClients/types/LessonClientTypes";
import { ContentBlockProps } from "../../../../types/ContentBlockTypes";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import ContentBlockRenderer from "./ContentBlockRenderer";
import {
  ContentBlockModals,
  ContentBlockPropsMap,
  ContentBlockRendererConfig,
  ContentBlocks,
  EditContentModalPropsMap,
} from "./ContentBlockTableTypes";

export const EmptyConfigComponent = (): null => null;
export const EmptyConfigModal = (): null => null;

export const EmptyConfigEntry = {
  renderBlock: EmptyConfigComponent,
  renderEditModal: EmptyConfigModal,
};

// Equivalent to { entry[key] for entry in config.items() } in Python.
const mapToObjectKey = <
  T extends keyof ContentBlockRendererConfig[ContentType]
>(
  config: ContentBlockRendererConfig,
  key: T,
) =>
  Object.fromEntries(
    Object.entries(config).map(([type, entry]) => [type, entry[key]]),
  ) as { [Type in ContentType]: ContentBlockRendererConfig[Type][T] };

const createContentBlockRenderers = (
  config: ContentBlockRendererConfig,
): [ContentBlocks, ContentBlockModals] => {
  const contentBlockRenderer = new ContentBlockRenderer<
    ContentBlockProps,
    ContentBlockPropsMap
  >(mapToObjectKey(config, "renderBlock"));
  const editModalRenderer = new ContentBlockRenderer<
    EditContentModalProps,
    EditContentModalPropsMap
  >(mapToObjectKey(config, "renderEditModal"));

  return [contentBlockRenderer, editModalRenderer];
};

export default createContentBlockRenderers;
