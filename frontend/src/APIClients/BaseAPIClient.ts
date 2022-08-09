import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  ObservableSubscription,
  Operation,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { createUploadLink } from "apollo-upload-client";
import {
  getLocalAccessToken,
  isAccessTokenExpired,
  refreshAccessToken,
} from "../utils/AuthUtils";

const httpLink = (createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: "include",
}) as unknown) as ApolloLink;

const authFromLocalLink = setContext(async (_, { headers }) => {
  const accessToken = getLocalAccessToken();
  return {
    headers: {
      ...headers,
      Authorizaton: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// So that we can use the client in token injection code.
let moduleClient: ApolloClient<NormalizedCacheObject>;

const getValidAccessToken = async () => {
  const accessToken = getLocalAccessToken();
  if (isAccessTokenExpired(accessToken)) {
    // eslint-disable-next-line no-console
    console.log("Access token expired, fetching a new one...");
    return refreshAccessToken(moduleClient);
  }
  return accessToken;
};

const injectAccessToken = async (operation: Operation) => {
  const accessToken = await getValidAccessToken();
  operation.setContext({
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

// https://www.apollographql.com/blog/apollo-client/using-apollo-link-to-handle-dependent-queries/
const accessTokenInjectionLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: ObservableSubscription | null;
      Promise.resolve(operation)
        .then((op) => injectAccessToken(op))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
      return () => handle?.unsubscribe();
    }),
);

const refreshDirectionalLink = new RetryLink().split(
  (operation) =>
    ["Refresh", "ResetPassword", "Login", "SignUp"].includes(
      operation.operationName,
    ),
  authFromLocalLink.concat(httpLink),
  accessTokenInjectionLink.concat(httpLink),
);

const pluralize = <T>(
  singularLabel: string,
  pluralLabel: string,
  ts: Readonly<Array<T>>,
): [string, T | Readonly<Array<T>>] => {
  return ts.length === 1 ? [singularLabel, ts[0]] : [pluralLabel, ts];
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      /* eslint-disable no-console */
      if (process.env.NODE_ENV === "development") {
        const { code, exception } = extensions || {};
        const { stacktrace } = exception || {};

        console.group("[GraphQL error]", message);
        if (path) {
          console.log(...pluralize("Endpoint:", "Endpoints:", path));
        }
        if (code) {
          console.log("Code:", code);
        }
        if (stacktrace) {
          console.log(stacktrace.join("\n"));
        }
        if (locations) {
          console.log(
            ...pluralize(
              "Location (in query):",
              "Locations (in query):",
              locations,
            ),
          );
        }
        console.groupEnd();
      } else {
        console.error("[GraphQL error]", message);
      }
      /* eslint-enable no-console */
    });
  }
  // eslint-disable-next-line no-console
  if (networkError) console.log("[Network error]", networkError);
});

/*
Link Tree
errorLink -> refreshDirectionalLink
              -> authFromLocalLink
              -> variableInjectionLink -> authFromContextLink
*/
const client = new ApolloClient({
  link: errorLink.concat(refreshDirectionalLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
moduleClient = client;

export default client;
