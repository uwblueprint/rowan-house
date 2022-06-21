import React from "react";
import { ContentType } from "../APIClients/types/LessonClientTypes";
import { ContentBlockState } from "../types/ModuleEditorTypes";

// Many thanks to https://github.com/Microsoft/TypeScript/issues/30581#issuecomment-1080979994.

type ValueOf<T> = T[keyof T];

type ArgMap<D extends ContentType> = {
  [K in D]: Extract<ContentBlockState, { ["type"]: { ["clientType"]: K } }>;
};

class ContentBlockRenderer<
  PropType extends { block: ContentBlockState },
  DispatchableT extends ContentType = ContentType
> {
  constructor(
    private dispatchTable: {
      [K in keyof ArgMap<DispatchableT>]: (
        props: Omit<PropType, "block"> & { block: ArgMap<DispatchableT>[K] },
      ) => React.ReactNode;
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
    return this.dispatchTable[op.method](op.arg);
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

export default ContentBlockRenderer;
