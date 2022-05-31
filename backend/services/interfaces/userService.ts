import {
  CreateUserDTO,
  Role,
  UpdateUserDTO,
  UserDTO,
  UserWithVerificationStatusDTO,
} from "../../types";

interface IUserService {
  /**
   * Get user associated with id
   * @param id user's id
   * @returns a UserDTO with user's information
   * @throws Error if user retrieval fails
   */
  getUserById(userId: string): Promise<UserDTO>;

  /**
   * Get user associated with email along with its verification status
   * @param email user's email
   * @returns a UserWithVerificationStatusDTO with user's information, including verification status
   * @throws Error if user retrieval fails
   */
  getUserWithVerificationStatusByEmail(
    email: string,
  ): Promise<UserWithVerificationStatusDTO>;

  /**
   * Get user associated with email
   * @param email user's email
   * @returns a UserDTO with user's information
   * @throws Error if user retrieval fails
   */
  getUserByEmail(email: string): Promise<UserDTO>;

  /**
   * Get role of user associated with authId
   * @param authId user's authId
   * @returns role of the user
   * @throws Error if user role retrieval fails
   */
  getUserRoleByAuthId(authId: string): Promise<Role>;

  /**
   * Get id of user associated with authId
   * @param authId user's authId
   * @returns id of the user
   * @throws Error if user id retrieval fails
   */
  getUserIdByAuthId(authId: string): Promise<string>;

  /**
   * Get authId of user associated with id
   * @param userId user's id
   * @returns user's authId
   * @throws Error if user authId retrieval fails
   */
  getAuthIdById(userId: string): Promise<string>;

  /**
   * Get all user information (possibly paginated in the future)
   * @returns array of UserDTOs
   * @throws Error if user retrieval fails
   */
  getUsers(): Promise<Array<UserDTO>>;

  /**
   * Get user count by town, limited by date range
   *  in which user was created
   *
   * Same date format: 'yyyy/mm/dd', eg. '1900/01/01'
   *
   * Sample return format:
   * {
   *  "Toronto": 2,
   *  "Vancouver": 3,
   *  "San Francisco": 88,
   * }
   *
   * @param startDate start of date range to query
   * @param endDate end of date range to query
   * @throws Error if query fails
   */
  getUserCountByTown(
    startDate?: string,
    endDate?: string,
  ): Promise<{ [key: string]: number }>;

  /**
   *  Get emailVerified for user by email
   * @param email user email
   * @returns user's emailVerified value
   * @throws Error if query fails
   */
  getUserEmailVerifiedByEmail(email: string): Promise<boolean>;
  /**
   * Create a user, email verification configurable
   * @param user the user to be created
   * @param authId the user's firebase auth id, optional
   * @param signUpMethod the method user used to signup
   * @returns a UserDTO with the created user's information
   * @throws Error if user creation fails
   */
  createUser(user: CreateUserDTO): Promise<UserDTO>;

  /**
   * Update a user.
   * Note: the password cannot be updated using this method, use IAuthService.resetPassword instead
   * @param userId user's id
   * @param user the user to be updated
   * @returns a UserDTO with the updated user's information
   * @throws Error if user update fails
   */
  updateUserById(userId: string, user: UpdateUserDTO): Promise<UserDTO>;

  /**
   * Delete a user by id
   * @param userId user's userId
   * @throws Error if user deletion fails
   */
  deleteUserById(userId: string): Promise<void>;

  /**
   * Delete a user by email
   * @param email user's email
   * @throws Error if user deletion fails
   */
  deleteUserByEmail(email: string): Promise<void>;
}

export default IUserService;
