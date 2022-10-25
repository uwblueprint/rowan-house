import { ExpressContext } from "apollo-server-express";
import { FileUpload } from "graphql-upload";
import FileStorageService from "../../services/implementations/fileStorageService";
import ImageUploadService from "../../services/implementations/imageUploadService";
import CourseService from "../../services/implementations/courseService";
import {
  CreateCourseRequestDTO,
  UpdateCourseRequestDTO,
  CourseResponseDTO,
  ICourseService,
} from "../../services/interfaces/ICourseService";
import { UploadedImage } from "../../services/interfaces/IImageUploadService";
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

const defaultBucket = process.env.FIREBASE_STORAGE_DEFAULT_BUCKET || "";
const fileStorageService = new FileStorageService(defaultBucket);
const imageUploadService = new ImageUploadService("images", fileStorageService);
const courseService: ICourseService = new CourseService(imageUploadService);
const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

const getCourseVisibilityAttributes = (
  role: Role | null,
): CourseVisibilityAttributes => {
  switch (role) {
    case null: // Logged-out users can see public published modules.
    case "Learner":
      return {
        includePrivateCourses: false,
        includeOnlyPublishedModules: true,
      };
    case "Staff":
      return {
        includePrivateCourses: false,
        includeOnlyPublishedModules: false,
      };
    case "Admin":
      return {
        includePrivateCourses: true,
        includeOnlyPublishedModules: false,
      };
    default:
      return assertNever(role);
  }
};

const courseResolvers = {
  Query: {
    course: async (
      _parent: undefined,
      { id }: { id: string },
      context: ExpressContext,
    ): Promise<CourseResponseDTO> => {
      const accessToken = getAccessToken(context.req);
      const role = await authService.getUserRoleByAccessToken(accessToken);
      const attributes = getCourseVisibilityAttributes(role);

      return courseService.getCourse(id, attributes);
    },
    courses: async (
      _parent: undefined,
      _args: { [key: string]: unknown },
      context: ExpressContext,
    ): Promise<CourseResponseDTO[]> => {
      const accessToken = getAccessToken(context.req);
      const role = await authService.getUserRoleByAccessToken(accessToken);
      const attributes = getCourseVisibilityAttributes(role);
      return courseService.getCourses(attributes);
    },
    publicCourses: async (): Promise<CourseResponseDTO[]> => {
      const attributes = getCourseVisibilityAttributes(null);
      return courseService.getCourses(attributes);
    },
    contentImage: async (
      _parent: undefined,
      { path }: { path: string },
    ): Promise<string> => {
      return imageUploadService.download(path);
    },
  },
  Mutation: {
    createCourse: async (
      _parent: undefined,
      { course }: { course: CreateCourseRequestDTO },
    ): Promise<CourseResponseDTO> => {
      return courseService.createCourse(course);
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
    uploadImage: async (
      _req: undefined,
      { file }: { file: Promise<FileUpload> },
    ): Promise<UploadedImage> => {
      return imageUploadService.upload(file);
    },
  },
};

export default courseResolvers;
