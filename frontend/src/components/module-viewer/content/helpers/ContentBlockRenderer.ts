import React from "react";
import { ContentType } from "../../../../APIClients/types/LessonClientTypes";
import { MappedProps } from "../../../../types/ContentBlockTypes";

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

export default ContentBlockRenderer;
