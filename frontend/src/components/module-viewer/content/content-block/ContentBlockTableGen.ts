import React from "react";
import { ContentType } from "../../../../APIClients/types/LessonClientTypes";
import {
  MappedProps,
  ContentBlockProps,
  ContentBlockTypeToState,
} from "../../../../types/ContentBlockTypes";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

// Many thanks to https://github.com/Microsoft/TypeScript/issues/30581#issuecomment-1080979994.
// This class provides a type-safe dispatch table for React components. In detail, it allows us
// to conditionally render different React components depending on the requested type of the
// provided component block, in a type-safe manner.

class ContentBlockRenderer<
  PropType extends MappedProps,
  PropMap extends { [K in ContentType]: PropType }
> {
  constructor(
    private dispatchTable: {
      [K in keyof PropMap]: React.ComponentType<PropMap[K]>;
    },
  ) {}

  private callWithMethodAndArgs(
    op: {
      [P in keyof PropMap]: {
        method: P;
        arg: PropMap[P];
      };
    }[keyof PropMap],
  ) {
    return React.createElement(this.dispatchTable[op.method], op.arg);
  }

  private callWithArgMap(props: PropMap[ContentType]) {
    return this.callWithMethodAndArgs({
      method: props.block.type.clientType,
      arg: props,
    });
  }

  public canDispatch(props: PropType): props is PropMap[ContentType] {
    return props.block.type.clientType in this.dispatchTable;
  }

  public render(props: PropType): React.ReactNode {
    if (this.canDispatch(props)) {
      return this.callWithArgMap(props);
    }

    throw new Error(
      `Unknown content type given to ContentBlockDispatcher: "${props.block.type.clientType}"`,
    );
  }
}

interface ConfigEntry<T extends ContentType> {
  renderBlock:
    | React.ComponentType<ContentBlockProps<ContentBlockTypeToState<T>>>
    | typeof EmptyConfigComponent;
  renderEditModal:
    | React.ComponentType<EditContentModalProps<ContentBlockTypeToState<T>>>
    | typeof EmptyConfigModal;
}

export const EmptyConfigComponent = (): null => null;
export const EmptyConfigModal = (): null => null;

export const EmptyConfigEntry = {
  renderBlock: EmptyConfigComponent,
  renderEditModal: EmptyConfigModal,
};

export type ContentBlockRendererConfig = {
  [Type in ContentType]: ConfigEntry<Type>;
};

export type ContentBlockRendererOverrideConfig = Partial<ContentBlockRendererConfig>;

type ContentBlockPropsMap = {
  [K in ContentType]: ContentBlockProps<ContentBlockTypeToState<K>>;
};

type EditContentModalPropsMap = {
  [K in ContentType]: EditContentModalProps<ContentBlockTypeToState<K>>;
};

export type ContentBlocks = ContentBlockRenderer<
  ContentBlockProps,
  ContentBlockPropsMap
>;
export type ContentBlockModals = ContentBlockRenderer<
  EditContentModalProps,
  EditContentModalPropsMap
>;

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
