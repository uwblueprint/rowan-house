import React from "react";
import { ContentType } from "../../../APIClients/types/LessonClientTypes";
import {
  ContentBlockProps,
  ContentBlockState,
  ContentBlockTypeToState,
} from "../../../types/ContentBlockTypes";
import { EditContentModalProps } from "../../../types/ModuleEditorTypes";

// Many thanks to https://github.com/Microsoft/TypeScript/issues/30581#issuecomment-1080979994.
// This class provides a type-safe dispatch table for React components. In detail, it allows us
// to conditionally render different React components depending on the requested type of the
// provided component block, in a type-safe manner.

type ValueOf<T> = T[keyof T];

type ArgMap<D extends ContentType> = {
  [K in D]: ContentBlockTypeToState<K>;
};

class ContentBlockRenderer<
  PropType extends { block: ContentBlockState },
  DispatchableT extends ContentType = ContentType
> {
  constructor(
    private dispatchTable: {
      [K in keyof ArgMap<DispatchableT>]: React.ComponentType<
        Omit<PropType, "block"> & { block: ArgMap<DispatchableT>[K] }
      >;
    },
  ) {}

  private callWithMethodAndArgs(
    op: {
      [P in keyof ArgMap<DispatchableT>]: {
        method: P;
        arg: Omit<PropType, "block"> & { block: ArgMap<DispatchableT>[P] };
      };
    }[keyof ArgMap<DispatchableT>],
  ) {
    return React.createElement(this.dispatchTable[op.method], op.arg);
  }

  private callWithArgMap(
    props: Omit<PropType, "block"> & { block: ValueOf<ArgMap<DispatchableT>> },
  ) {
    return this.callWithMethodAndArgs({
      method: props.block.type.clientType,
      arg: props,
    });
  }

  public canDispatch(
    block: ContentBlockState,
  ): block is ValueOf<ArgMap<DispatchableT>> {
    return block.type.clientType in this.dispatchTable;
  }

  public render(props: PropType): React.ReactNode {
    const { block, ...rest } = props;

    if (this.canDispatch(block)) {
      return this.callWithArgMap({ block, ...rest });
    }

    throw new Error(
      `Unknown content type given to ContentBlockDispatcher: "${block.type.clientType}"`,
    );
  }
}

interface ConfigEntry<T extends ContentType> {
  renderBlock:
    | React.ComponentType<ContentBlockProps<ContentBlockTypeToState<T>>>
    | typeof EmptyConfigComponent;
  renderEditModal:
    | React.ComponentType<EditContentModalProps<ContentBlockTypeToState<T>>>
    | typeof EmptyConfigComponent;
}

export const EmptyConfigComponent = (): null => null;
export const EmptyConfigEntry = {
  renderBlock: EmptyConfigComponent,
  renderEditModal: EmptyConfigComponent,
};

export type ContentBlockRendererConfig = {
  [Type in ContentType]: ConfigEntry<Type>;
};

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
): [
  ContentBlockRenderer<ContentBlockProps<ContentBlockState>>,
  ContentBlockRenderer<EditContentModalProps<ContentBlockState>>,
] => {
  const contentBlockRenderer = new ContentBlockRenderer<
    ContentBlockProps<ContentBlockState>
  >(mapToObjectKey(config, "renderBlock"));
  const editModalRenderer = new ContentBlockRenderer<
    EditContentModalProps<ContentBlockState>
  >(mapToObjectKey(config, "renderEditModal"));

  return [contentBlockRenderer, editModalRenderer];
};

export default createContentBlockRenderers;
