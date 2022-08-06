import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import jwt from "jsonwebtoken";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "./LocalStorageUtils";
import { REFRESH } from "../APIClients/mutations/AuthMutations";
import AuthAPIClient from "../APIClients/AuthAPIClient";

export const getLocalAccessToken = (): string => {
  return getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  ) as string;
};

const EXPIRY_BUFFER_MINS = 1;

export const isAccessTokenExpired = (accessToken: string): boolean => {
  const decodedToken = jwt.decode(String(accessToken));
  const currTime = Math.round(new Date().getTime() / 1000);
  return (
    typeof decodedToken !== "object" ||
    !decodedToken ||
    !decodedToken.exp ||
    decodedToken.exp <= currTime + EXPIRY_BUFFER_MINS * 60
  );
};

const getRefreshedAccessToken = async (
  client: ApolloClient<NormalizedCacheObject>,
) => {
  const token = await AuthAPIClient.refresh(() =>
    client.mutate({ mutation: REFRESH }),
  );
  if (!token) throw new Error("Failed to refresh access token!");
  return token;
};

export const refreshAccessToken = (() => {
  let pendingRefreshPromise: Promise<string> | null = null;
  return async (
    client: ApolloClient<NormalizedCacheObject>,
  ): Promise<string> => {
    if (!pendingRefreshPromise) {
      pendingRefreshPromise = getRefreshedAccessToken(client).finally(() => {
        pendingRefreshPromise = null;
      });
    }
    return pendingRefreshPromise;
  };
})();
