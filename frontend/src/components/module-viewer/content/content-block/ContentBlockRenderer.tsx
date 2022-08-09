import { ButtonBlock, TextBlock, ImageBlock, VideoBlock } from "..";
import {
  EditButtonModal,
  EditTextModal,
  EditImageModal,
  EditVideoModal,
} from "../modals";

import createContentBlockRenderers, {
  EmptyConfigEntry as Empty,
  ContentBlockRendererOverrideConfig,
  ContentBlockModals,
  ContentBlocks,
} from "./ContentBlockTableGen";

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
