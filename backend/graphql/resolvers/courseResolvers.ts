import { AuthenticationError, ExpressContext } from "apollo-server-express";
import CourseService from "../../services/implementations/courseService";
import {
  CreateCourseRequestDTO,
  UpdateCourseRequestDTO,
  CourseResponseDTO,
  ICourseService,
} from "../../services/interfaces/ICourseService";
import { getAccessToken } from "../../middlewares/auth";
import IAuthService from "../../services/interfaces/authService";
import AuthService from "../../services/implementations/authService";
import nodemailerConfig from "../../nodemailer.config";
import EmailService from "../../services/implementations/emailService";
import UserService from "../../services/implementations/userService";
import IEmailService from "../../services/interfaces/emailService";
import IUserService from "../../services/interfaces/userService";
import { Role } from "../../types";
import { CourseVisibilityAttributes } from "../../models/course.model";
import { assertNever } from "../../utilities/errorUtils";

const courseService: ICourseService = new CourseService();
const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

const getCourseVisibilityAttributes = (
  role: Role,
): CourseVisibilityAttributes => {
  switch (role) {
    case "User":
      return { private: false, published: true };
    case "Staff":
      return { published: true };
    case "Admin":
      return {};
    default:
      return assertNever(role);
  }
};

const courseResolvers = {
  Query: {
    course: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<CourseResponseDTO> => {
      return courseService.getCourse(id);
    },
    courses: async (
      _parent: any,
      _args: { [key: string]: any },
      context: ExpressContext,
    ): Promise<CourseResponseDTO[]> => {
      const accessToken = getAccessToken(context.req);
      if (!accessToken) {
        throw new AuthenticationError(
          "Failed authentication and/or authorization by role",
        );
      }

      const role = await authService.getUserRoleByAccessToken(accessToken);
      const attributes = getCourseVisibilityAttributes(role);
      return courseService.getCourses(attributes);
    },
  },
  Mutation: {
    createCourse: async (
      _parent: undefined,
      { course }: { course: CreateCourseRequestDTO },
    ): Promise<CourseResponseDTO> => {
      const newCourse = await courseService.createCourse(course);
      return newCourse;
    },
    updateCourse: async (
      _parent: undefined,
      { id, course }: { id: string; course: UpdateCourseRequestDTO },
    ): Promise<CourseResponseDTO | null> => {
      return courseService.updateCourse(id, course);
    },
    deleteCourse: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<string> => {
      return courseService.deleteCourse(id);
    },
  },
};

export default courseResolvers;
