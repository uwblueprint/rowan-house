import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { makeExecutableSchema, gql } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { merge } from "lodash";

import {
  isAuthorizedByEmail,
  isAuthorizedByRole,
  isAuthorizedByUserId,
  idNotSameAsActiveUser,
} from "../middlewares/auth";
import and from "../middlewares/utils/combinatorsUtils";
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
import progressResolvers from "./resolvers/progressResolvers";
import progressType from "./types/progressType";

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

const scalarTypes = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};

const executableSchema = makeExecutableSchema({
  typeDefs: [
    query,
    mutation,
    authType,
    courseType,
    entityType,
    userType,
    lessonType,
    progressType,
  ],
  resolvers: merge(
    scalarTypes,
    authResolvers,
    courseResolvers,
    entityResolvers,
    userResolvers,
    lessonResolvers,
    progressResolvers,
  ),
});

const authorizedByAllRoles = () =>
  isAuthorizedByRole(new Set(["Learner", "Admin", "Staff"]));
const authorizedByAdmin = () => isAuthorizedByRole(new Set(["Admin"]));
const authorizeRoleChange = (id: string) => {
  return and(authorizedByAdmin(), idNotSameAsActiveUser(id));
};

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
    lessons: authorizedByAllRoles(),
    courseProgress: isAuthorizedByUserId("userId"),
    moduleProgress: isAuthorizedByUserId("userId"),
    lessonProgress: isAuthorizedByUserId("userId"),
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
    updateUserRole: authorizeRoleChange("id"),
    deleteUserById: authorizedByAdmin(),
    deleteUserByEmail: authorizedByAdmin(),
    logout: isAuthorizedByUserId("userId"),
    resetPassword: isAuthorizedByEmail("email"),
    createLesson: authorizedByAdmin(),
    updateLesson: authorizedByAdmin(),
    deleteLesson: authorizedByAdmin(),
    markModuleAsStartedForUser: isAuthorizedByUserId("userId"),
    markModuleAsCompletedForUser: isAuthorizedByUserId("userId"),
    markLessonAsCompletedForUser: isAuthorizedByUserId("userId"),
  },
};

export default applyMiddleware(executableSchema, graphQLMiddlewares);
