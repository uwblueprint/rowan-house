import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as firebaseAdmin from "firebase-admin";

import { ApolloServer } from "apollo-server-express";
import { mongo } from "./models";
import schema from "./graphql";

const CORS_ALLOW_LIST = [
  // Local development
  "http://localhost:3000",
  // Preview URLs
  /^https:\/\/rowan-house-society--pr.*\.web\.app$/,
  // Staging
  "https://rowan-house-society.firebaseapp.com",
  "https://rowan-house-society.web.app",
  // Prod
  "https://rhs-course-platform.web.app",
  "https://courses.rowanhouse.ca",
];

const CORS_OPTIONS: cors.CorsOptions = {
  // origin: [/.*/],
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
  // For deployed backend debugging (also check CORS)
  // introspection: true,
  // playground: true,
});

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: { origin: CORS_ALLOW_LIST, credentials: true },
});

mongo.connect();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_SVC_ACCOUNT_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n",
    ),
    clientEmail: process.env.FIREBASE_SVC_ACCOUNT_CLIENT_EMAIL,
  }),
});

app.listen({ port: process.env.PORT || 5000 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port ${process.env.PORT || 5000}!`);
});
