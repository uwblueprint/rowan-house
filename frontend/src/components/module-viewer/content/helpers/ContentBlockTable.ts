import {
  ButtonBlock,
  HeadingBlock,
  TextBlock,
  ImageBlock,
  VideoBlock,
  MatchBlock,
  FlipCardBlock,
} from "../blocks";
import {
  EditButtonModal,
  EditTextModal,
  EditImageModal,
  EditVideoModal,
  EditHeadingModal,
  EditMatchModal,
  EditFlipCardModal,
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
    heading: {
      renderBlock: HeadingBlock,
      renderEditModal: EditHeadingModal,
    },
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
    match: {
      renderBlock: MatchBlock,
      renderEditModal: EditMatchModal,
    },
    cards: {
      renderBlock: FlipCardBlock,
      renderEditModal: EditFlipCardModal,
    },
  };
  return createContentBlockRenderers({
    ...defaults,
    ...overrides,
  });
};
