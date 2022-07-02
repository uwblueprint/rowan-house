import { Request } from "express";
import { AuthenticationError, ExpressContext } from "apollo-server-express";
import { GraphQLResolveInfo } from "graphql";
import { IMiddlewareFunction } from "graphql-middleware";

import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import IAuthService from "../services/interfaces/authService";
import { Role } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Resolve = (
  parent: any,
  args: { [key: string]: any },
  context: ExpressContext | undefined,
  info: GraphQLResolveInfo | undefined,
) => any;

const authService: IAuthService = new AuthService(new UserService());

export const getAccessToken = (req: Request): string | null => {
  const authHeaderParts = req.headers.authorization?.split(" ");
  if (
    authHeaderParts &&
    authHeaderParts.length >= 2 &&
    authHeaderParts[0].toLowerCase() === "bearer"
  ) {
    return authHeaderParts[1];
  }
  return null;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const callResolver = async (
  resolver: IMiddlewareFunction<any, ExpressContext>,
  resolve: Resolve,
  parent: any,
  args: { [key: string]: any },
  context: ExpressContext,
  info: GraphQLResolveInfo,
  // eslint-disable-next-line consistent-return
) => {
  if ("resolve" in resolver) {
    return resolver.resolve?.(resolve, parent, args, context, info);
  }
  if (typeof resolver === "function") {
    return resolver(resolve, parent, args, context, info);
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const and = (
  firstFn: IMiddlewareFunction<any, ExpressContext>,
  secondFn: IMiddlewareFunction<any, ExpressContext>,
) => {
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
};

/* Determine if the user whose role is to be changed does not match the currently 
logged in user. 
 * Note: userIdField is the name of the request parameter containing the requested userId */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const isAuthorizedToChangeRole = (userIdField: string) => {
  return async (
    resolve: (
      parent: any,
      args: { [key: string]: any },
      context: ExpressContext,
      info: GraphQLResolveInfo,
    ) => any,
    parent: any,
    args: { [key: string]: any },
    context: ExpressContext,
    info: GraphQLResolveInfo,
  ) => {
    const accessToken = getAccessToken(context.req);
    const authorized =
      accessToken &&
      (await authService.isAuthorizedToChangeRole(
        accessToken,
        args[userIdField],
      ));

    if (!authorized) {
      throw new AuthenticationError(
        "Failed authentication and/or authorization by userId",
      );
    }

    return resolve(parent, args, context, info);
  };
};

/* Determine if request is authorized based on accessToken validity and role of client */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const isAuthorizedByRole = (roles: Set<Role>) => {
  return async (
    resolve: (
      parent: any,
      args: { [key: string]: any },
      context: ExpressContext,
      info: GraphQLResolveInfo,
    ) => any,
    parent: any,
    args: { [key: string]: any },
    context: ExpressContext,
    info: GraphQLResolveInfo,
  ) => {
    const accessToken = getAccessToken(context.req);
    const authorized =
      accessToken && (await authService.isAuthorizedByRole(accessToken, roles));

    if (!authorized) {
      throw new AuthenticationError(
        "Failed authentication and/or authorization by role",
      );
    }

    return resolve(parent, args, context, info);
  };
};

/* Determine if request for a user-specific resource is authorized based on accessToken
 * validity and if the userId that the token was issued to matches the requested userId
 * Note: userIdField is the name of the request parameter containing the requested userId */
export const isAuthorizedByUserId = (userIdField: string) => {
  return async (
    resolve: (
      parent: any,
      args: { [key: string]: any },
      context: ExpressContext,
      info: GraphQLResolveInfo,
    ) => any,
    parent: any,
    args: { [key: string]: any },
    context: ExpressContext,
    info: GraphQLResolveInfo,
  ) => {
    const accessToken = getAccessToken(context.req);
    const authorized =
      accessToken &&
      (await authService.isAuthorizedByUserId(accessToken, args[userIdField]));

    if (!authorized) {
      throw new AuthenticationError(
        "Failed authentication and/or authorization by userId",
      );
    }

    return resolve(parent, args, context, info);
  };
};

/* Determine if request for a user-specific resource is authorized based on accessToken
 * validity and if the email that the token was issued to matches the requested email
 * Note: emailField is the name of the request parameter containing the requested email */
export const isAuthorizedByEmail = (emailField: string) => {
  return async (
    resolve: (
      parent: any,
      args: { [key: string]: any },
      context: ExpressContext,
      info: GraphQLResolveInfo,
    ) => any,
    parent: any,
    args: { [key: string]: any },
    context: ExpressContext,
    info: GraphQLResolveInfo,
  ) => {
    const accessToken = getAccessToken(context.req);
    const authorized =
      accessToken &&
      (await authService.isAuthorizedByEmail(accessToken, args[emailField]));

    if (!authorized) {
      throw new AuthenticationError(
        "Failed authentication and/or authorization by email",
      );
    }

    return resolve(parent, args, context, info);
  };
};
