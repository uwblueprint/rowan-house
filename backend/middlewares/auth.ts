import { Request } from "express";
import { AuthenticationError, ExpressContext } from "apollo-server-express";
import { GraphQLResolveInfo } from "graphql";

import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import IAuthService from "../services/interfaces/authService";
import { Role } from "../types";

const authService: IAuthService = new AuthService(new UserService());

export const getAccessToken = (req: Request): string | null => {
  const [scheme, token] = req.headers.authorization?.split(" ") || [];
  if (scheme?.toLowerCase() === "bearer") {
    return token === "null" ? null : token;
  }
  return null;
};

/* Determine if the user whose role is to be changed does not match the currently
logged in user.
 * Note: userIdField is the name of the request parameter containing the requested userId */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const idNotSameAsActiveUser = (userIdField: string) => {
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
      (await authService.idNotSameAsActiveUser(accessToken, args[userIdField]));

    if (!authorized) {
      throw new AuthenticationError("User ID cannot change its own role");
    }
    return resolve(parent, args, context, info);
  };
};

/* Mark request as always authorized */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const publicRoute = async (
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
) => resolve(parent, args, context, info);

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
