import { GraphQLResolveInfo } from "graphql";
import { ExpressContext } from "apollo-server-express";
import { IMiddlewareFunction } from "graphql-middleware";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Resolve = (
  parent: any,
  args: { [key: string]: any },
  context: ExpressContext | undefined,
  info: GraphQLResolveInfo | undefined,
) => any;

export const callResolver = async (
  resolver: IMiddlewareFunction<any, ExpressContext>,
  resolve: Resolve,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  parent: any,
  args: { [key: string]: any },
  context: ExpressContext,
  info: GraphQLResolveInfo,
  // eslint-disable-next-line consistent-return
): Promise<IMiddlewareFunction<any, ExpressContext, any> | undefined> => {
  if ("resolve" in resolver) {
    return resolver.resolve?.(resolve, parent, args, context, info);
  }
  if (typeof resolver === "function") {
    return resolver(resolve, parent, args, context, info);
  }
};

// Combine two middleware functions and returns their result
export default function and(
  firstFn: IMiddlewareFunction<any, ExpressContext>,
  secondFn: IMiddlewareFunction<any, ExpressContext>,
): IMiddlewareFunction<any, ExpressContext> {
  return async (
    resolve: Resolve,
    parent: any,
    args: { [key: string]: any },
    context: ExpressContext,
    info: GraphQLResolveInfo,
  ) => {
    const resolveFirst = async () => {
      return callResolver(secondFn, resolve, parent, args, context, info);
    };
    return callResolver(firstFn, resolveFirst, parent, args, context, info);
  };
}
