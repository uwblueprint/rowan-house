import { ButtonBlock, TextBlock, ImageBlock, VideoBlock } from "../blocks";
import {
  EditButtonModal,
  EditTextModal,
  EditImageModal,
  EditVideoModal,
} from "../modals";
import {
  ContentBlockModals,
  ContentBlockRendererOverrideConfig,
  ContentBlocks,
} from "./ContentBlockTableTypes";
import createContentBlockRenderers, {
  EmptyConfigEntry as Empty,
} from "./ContentBlockTableUtils";

export default (
  overrides: ContentBlockRendererOverrideConfig = {},
): [ContentBlocks, ContentBlockModals] => {
  const defaults = {
    column: Empty,
    heading: Empty,
    text: {
      renderBlock: TextBlock,
      renderEditModal: EditTextModal,
    },
    link: Empty,
    button: {
      renderBlock: ButtonBlock,
      renderEditModal: EditButtonModal,
    },
    image: {
      renderBlock: ImageBlock,
      renderEditModal: EditImageModal,
    },
    video: {
      renderBlock: VideoBlock,
      renderEditModal: EditVideoModal,
    },
    audio: Empty,
  };
  return createContentBlockRenderers({
    ...defaults,
    ...overrides,
  });
};
