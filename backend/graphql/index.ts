import { makeExecutableSchema, gql } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { merge } from "lodash";

import {
  isAuthorizedByEmail,
  isAuthorizedByRole,
  isAuthorizedByUserId,
} from "../middlewares/auth";
import authResolvers from "./resolvers/authResolvers";
import authType from "./types/authType";
import courseResolvers from "./resolvers/courseResolvers";
import courseType from "./types/courseType";
import entityResolvers from "./resolvers/entityResolvers";
import entityType from "./types/entityType";
import userResolvers from "./resolvers/userResolvers";
import userType from "./types/userType";
import lessonResolvers from "./resolvers/lessonResolvers";
import lessonType from "./types/lessonType";

const query = gql`
  type Query {
    _empty: String
  }
`;

const mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const executableSchema = makeExecutableSchema({
  typeDefs: [
    query,
    mutation,
    authType,
    courseType,
    entityType,
    userType,
    lessonType,
  ],
  resolvers: merge(
    authResolvers,
    courseResolvers,
    entityResolvers,
    userResolvers,
    lessonResolvers,
  ),
});

const authorizedByAllRoles = () =>
  isAuthorizedByRole(new Set(["User", "Admin", "Staff"]));
const authorizedByAdmin = () => isAuthorizedByRole(new Set(["Admin"]));

const graphQLMiddlewares = {
  Query: {
    course: authorizedByAllRoles(),
    courses: authorizedByAllRoles(),
    entity: authorizedByAllRoles(),
    entities: authorizedByAllRoles(),
    userById: authorizedByAdmin(),
    userByEmail: authorizedByAdmin(),
    users: authorizedByAdmin(),
    userCountByTown: authorizedByAdmin(),
    lessonById: authorizedByAllRoles(),
  },
  Mutation: {
    createCourse: authorizedByAdmin(),
    updateCourse: authorizedByAdmin(),
    deleteCourse: authorizedByAdmin(),
    createEntity: authorizedByAllRoles(),
    updateEntity: authorizedByAllRoles(),
    deleteEntity: authorizedByAllRoles(),
    createUser: authorizedByAdmin(),
    updateUser: authorizedByAdmin(),
    deleteUserById: authorizedByAdmin(),
    deleteUserByEmail: authorizedByAdmin(),
    logout: isAuthorizedByUserId("userId"),
    resetPassword: isAuthorizedByEmail("email"),
    createLesson: authorizedByAdmin(),
    updateLesson: authorizedByAdmin(),
    deleteLesson: authorizedByAdmin(),
  },
};

export default applyMiddleware(executableSchema, graphQLMiddlewares);
