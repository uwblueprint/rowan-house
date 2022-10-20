import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { makeExecutableSchema, gql } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { merge } from "lodash";

import {
  isAuthorizedByRole,
  isAuthorizedByUserId,
  idNotSameAsActiveUser,
  publicRoute,
} from "../middlewares/auth";
import and from "../middlewares/utils/combinatorsUtils";
import authResolvers from "./resolvers/authResolvers";
import authType from "./types/authType";
import courseResolvers from "./resolvers/courseResolvers";
import courseType from "./types/courseType";
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
    userType,
    lessonType,
    progressType,
  ],
  resolvers: merge(
    scalarTypes,
    authResolvers,
    courseResolvers,
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
    course: publicRoute,
    courses: publicRoute,
    publicCourses: publicRoute,
    userById: authorizedByAdmin(),
    userByEmail: authorizedByAdmin(),
    users: authorizedByAdmin(),
    userCountByTown: authorizedByAdmin(),
    lessonById: authorizedByAllRoles(),
    lessons: authorizedByAllRoles(),
    lessonTitles: publicRoute,
    courseProgress: isAuthorizedByUserId("userId"),
    moduleProgress: isAuthorizedByUserId("userId"),
    lessonProgress: isAuthorizedByUserId("userId"),
  },
  Mutation: {
    createCourse: authorizedByAdmin(),
    updateCourse: authorizedByAdmin(),
    deleteCourse: authorizedByAdmin(),
    uploadModuleImage: authorizedByAdmin(),
    createUser: authorizedByAdmin(),
    updateUser: authorizedByAdmin(),
    updateUserRole: authorizeRoleChange("id"),
    deleteUserById: authorizedByAdmin(),
    deleteUserByEmail: authorizedByAdmin(),
    logout: isAuthorizedByUserId("userId"),
    resetPassword: publicRoute,
    createLesson: authorizedByAdmin(),
    updateLesson: authorizedByAdmin(),
    deleteLesson: authorizedByAdmin(),
    markModuleAsStartedForUser: isAuthorizedByUserId("userId"),
    markModuleAsCompletedForUser: isAuthorizedByUserId("userId"),
    markLessonAsCompletedForUser: isAuthorizedByUserId("userId"),
  },
};

export default applyMiddleware(executableSchema, graphQLMiddlewares);
