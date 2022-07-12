import * as firebaseAdmin from "firebase-admin";
import { Types } from "mongoose";

import IUserService from "../interfaces/userService";
import MgUser, { User } from "../../models/user.model";
import { CreateUserDTO, Role, UpdateUserDTO, UserDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

const getMongoUserByAuthId = async (authId: string): Promise<User> => {
  const user: User | null = await MgUser.findOne({ authId });
  if (!user) {
    throw new Error(`user with authId ${authId} not found.`);
  }
  return user;
};

/**
 * Utility method for converting yyyy/mm/dd date
 *  string to 24-char hex timestamp string
 *
 * ObjectID docs:
 *  https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
 * Reference:
 *  https://kchodorow.com/2011/12/20/querying-for-timestamps-using-objectids/
 */
const getDateTime = (date: string): string =>
  `${Math.floor(new Date(date).getTime() / 1000).toString(16)}0000000000000000`;

interface LimitByDateQuery {
  $match: {
    _id: {
      [key: string]: Types.ObjectId;
    };
  };
}

const buildLimitByDateQuery = (
  startDate?: string,
  endDate?: string,
): LimitByDateQuery => {
  const matchQuery: LimitByDateQuery = { $match: { _id: {} } };

  if (startDate) {
    // eslint-disable-next-line no-underscore-dangle
    matchQuery.$match._id.$gt = Types.ObjectId(getDateTime(startDate));
  }

  if (endDate) {
    // eslint-disable-next-line no-underscore-dangle
    matchQuery.$match._id.$lt = Types.ObjectId(getDateTime(endDate));
  }

  return matchQuery;
};

interface UserCountGroupByTown {
  _id: string;
  userCount: number;
}

class UserService implements IUserService {
  /* eslint-disable class-methods-use-this */
  async getUserById(userId: string): Promise<UserDTO> {
    let user: User | null;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      user = await MgUser.findById(userId);

      if (!user) {
        throw new Error(`userId ${userId} not found.`);
      }

      firebaseUser = await firebaseAdmin.auth().getUser(user.authId);
    } catch (error: unknown) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: firebaseUser.email ?? "",
      role: user.role,
      town: user.town,
    };
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    let user: User | null;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      firebaseUser = await firebaseAdmin.auth().getUserByEmail(email);
      user = await getMongoUserByAuthId(firebaseUser.uid);

      if (!user) {
        throw new Error(`userId with authId ${firebaseUser.uid} not found.`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: firebaseUser.email ?? "",
      role: user.role,
      town: user.town,
    };
  }

  async getUserRoleByAuthId(authId: string): Promise<Role> {
    try {
      const { role } = await getMongoUserByAuthId(authId);
      return role;
    } catch (error: unknown) {
      Logger.error(
        `Failed to get user role. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getUserIdByAuthId(authId: string): Promise<string> {
    try {
      const { id } = await getMongoUserByAuthId(authId);
      return id;
    } catch (error: unknown) {
      Logger.error(`Failed to get user id. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getAuthIdById(userId: string): Promise<string> {
    try {
      const user = await MgUser.findById(userId);
      if (!user) {
        throw new Error(`userId ${userId} not found.`);
      }
      return user.authId;
    } catch (error: unknown) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getUsers(): Promise<Array<UserDTO>> {
    let userDtos: Array<UserDTO> = [];

    try {
      const users: Array<User> = await MgUser.find();

      userDtos = await Promise.all(
        users.map(async (user) => {
          let firebaseUser: firebaseAdmin.auth.UserRecord;

          try {
            firebaseUser = await firebaseAdmin.auth().getUser(user.authId);
          } catch (error) {
            Logger.error(
              `user with authId ${user.authId} could not be fetched from Firebase`,
            );
            throw error;
          }

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: firebaseUser.email ?? "",
            role: user.role,
            town: user.town,
          };
        }),
      );
    } catch (error: unknown) {
      Logger.error(`Failed to get users. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return userDtos;
  }

  async getUserCountByTown(
    startDate?: string,
    endDate?: string,
  ): Promise<{ [key: string]: number }> {
    const groupByQuery = { $group: { _id: "$town", userCount: { $sum: 1 } } };

    let query: Array<UserCountGroupByTown>;

    if (!startDate && !endDate) {
      query = await MgUser.aggregate([groupByQuery]).exec();
    } else {
      query = await MgUser.aggregate([
        buildLimitByDateQuery(startDate, endDate),
        groupByQuery,
      ]).exec();
    }

    return query.reduce(
      (map: { [key: string]: number }, obj: UserCountGroupByTown) => {
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        map[obj._id] = obj.userCount;
        return map;
      },
      {},
    );
  }

  async getUserEmailVerifiedByEmail(email: string): Promise<boolean> {
    try {
      return (await firebaseAdmin.auth().getUserByEmail(email)).emailVerified;
    } catch (error: unknown) {
      Logger.error(
        `Failed to get email verification status. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async createUser(user: CreateUserDTO): Promise<UserDTO> {
    let newUser: User;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      firebaseUser = await firebaseAdmin.auth().createUser({
        email: user.email,
        password: user.password,
      });

      try {
        newUser = await MgUser.create({
          firstName: user.firstName,
          lastName: user.lastName,
          authId: firebaseUser.uid,
          role: user.role,
          town: user.town,
        });
      } catch (mongoDbError) {
        // rollback user creation in Firebase
        try {
          await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
        } catch (firebaseError: unknown) {
          const errorMessage = [
            "Failed to rollback Firebase user creation after MongoDB user creation failure. Reason =",
            getErrorMessage(firebaseError),
            "Orphaned authId (Firebase uid) =",
            firebaseUser.uid,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw mongoDbError;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to create user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: firebaseUser.email ?? "",
      role: newUser.role,
      town: user.town,
    };
  }

  async updateUserById(userId: string, user: UpdateUserDTO): Promise<UserDTO> {
    let oldUser: User | null;
    let updatedFirebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      // must explicitly specify runValidators when updating through findByIdAndUpdate
      oldUser = await MgUser.findByIdAndUpdate(
        userId,
        { firstName: user.firstName, lastName: user.lastName, role: user.role },
        { runValidators: true },
      );

      if (!oldUser) {
        throw new Error(`userId ${userId} not found.`);
      }

      try {
        updatedFirebaseUser = await firebaseAdmin
          .auth()
          .updateUser(oldUser.authId, { email: user.email });
      } catch (error) {
        // rollback MongoDB user updates
        try {
          await MgUser.findByIdAndUpdate(
            userId,
            {
              firstName: oldUser.firstName,
              lastName: oldUser.lastName,
              role: oldUser.role,
            },
            { runValidators: true },
          );
        } catch (mongoDbError: unknown) {
          const errorMessage = [
            "Failed to rollback MongoDB user update after Firebase user update failure. Reason =",
            getErrorMessage(mongoDbError),
            "MongoDB user id with possibly inconsistent data =",
            oldUser.id,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to update user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: updatedFirebaseUser.email ?? "",
      role: user.role,
      town: user.town,
    };
  }

  async updateUserRole(userId: string, userRole: Role): Promise<Role> {
    let updatedUser: User | null;

    try {
      // must explicitly specify runValidators when updating through findByIdAndUpdate
      updatedUser = await MgUser.findByIdAndUpdate(
        userId,
        { role: userRole },
        { runValidators: true, new: true },
      );

      if (!updatedUser) {
        throw new Error(`userId ${userId} not found.`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update user role. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return updatedUser.role;
  }

  async deleteUserById(userId: string): Promise<void> {
    try {
      const deletedUser: User | null = await MgUser.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error(`userId ${userId} not found.`);
      }

      try {
        await firebaseAdmin.auth().deleteUser(deletedUser.authId);
      } catch (error) {
        // rollback user deletion in MongoDB
        try {
          await MgUser.create({
            firstName: deletedUser.firstName,
            lastName: deletedUser.lastName,
            authId: deletedUser.authId,
            role: deletedUser.role,
          });
        } catch (mongoDbError: unknown) {
          const errorMessage = [
            "Failed to rollback MongoDB user deletion after Firebase user deletion failure. Reason =",
            getErrorMessage(mongoDbError),
            "Firebase uid with non-existent MongoDB record =",
            deletedUser.authId,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to delete user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async deleteUserByEmail(email: string): Promise<void> {
    try {
      const firebaseUser: firebaseAdmin.auth.UserRecord = await firebaseAdmin
        .auth()
        .getUserByEmail(email);
      const deletedUser: User | null = await MgUser.findOneAndDelete({
        authId: firebaseUser.uid,
      });

      if (!deletedUser) {
        throw new Error(`authId (Firebase uid) ${firebaseUser.uid} not found.`);
      }

      try {
        await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
      } catch (error) {
        try {
          // rollback user deletion in MongoDB
          await MgUser.create({
            firstName: deletedUser.firstName,
            lastName: deletedUser.lastName,
            authId: deletedUser.authId,
            role: deletedUser.role,
          });
        } catch (mongoDbError: unknown) {
          const errorMessage = [
            "Failed to rollback MongoDB user deletion after Firebase user deletion failure. Reason =",
            getErrorMessage(mongoDbError),
            "Firebase uid with non-existent MongoDB record =",
            deletedUser.authId,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to delete user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default UserService;
