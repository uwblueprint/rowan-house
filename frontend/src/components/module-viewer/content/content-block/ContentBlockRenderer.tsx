import { ButtonBlock, TextBlock, ImageBlock, VideoBlock } from "..";
import { AudioBlockState, ColumnBlockState, HeadingBlockState, LinkBlockState } from "../../../../types/ContentBlockTypes";
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
    column: Empty<ColumnBlockState>(),
    heading: Empty<HeadingBlockState>(),
    text: {
      renderBlock: TextBlock,
      renderEditModal: EditTextModal,
    },
    link: Empty<LinkBlockState>(),
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
    audio: Empty<AudioBlockState>(),
  };
  return createContentBlockRenderers({
    ...defaults,
    ...overrides,
  });
};
