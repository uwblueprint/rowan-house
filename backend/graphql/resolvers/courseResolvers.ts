import { AuthenticationError, ExpressContext } from "apollo-server-express";
import fs from "fs";
import { FileUpload } from "graphql-upload";
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { ReadStream } from "fs-capacitor";
import multer from "multer";
import FileStorageService from "../../services/implementations/fileStorageService";
import CourseService from "../../services/implementations/courseService";
import {
  CreateCourseRequestDTO,
  UpdateCourseRequestDTO,
  CourseResponseDTO,
  ICourseService,
  UploadModuleImage,
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
import {
  getFileTypeValidationError,
  validateImageFileType,
} from "../../middlewares/validators/util";

const defaultBucket = process.env.FIREBASE_STORAGE_DEFAULT_BUCKET || "";
const fileStorageService = new FileStorageService(defaultBucket);
const courseService: ICourseService = new CourseService(fileStorageService);
const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

multer({ dest: "moduleImages/" });

const writeFile = (readStream: ReadStream, filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(filePath);
    readStream.pipe(out);
    out.on("finish", () => {
      resolve();
    });
    out.on("error", (err: Error) => reject(err));
  });
};

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
    moduleImage: async (
      _parent: undefined,
      { fileName }: { fileName: string },
    ): Promise<string> => {
      return courseService.getModuleImage(fileName);
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

    uploadModuleImage: async (
      _req: undefined,
      { file }: { file: Promise<FileUpload> },
    ): Promise<UploadModuleImage> => {
      let filePath = "";
      let fileContentType = "";
      if (file) {
        const { createReadStream, mimetype, filename } = await file;
        const uploadDir = "moduleImages";
        filePath = `${uploadDir}/${filename}`;
        fileContentType = mimetype;
        if (!validateImageFileType(fileContentType)) {
          throw new Error(getFileTypeValidationError(fileContentType));
        }
        await writeFile(createReadStream(), filePath);
      }
      const uploadedModuleImage = await courseService.uploadModuleImage(
        filePath,
        fileContentType,
      );

      if (filePath) {
        fs.unlinkSync(filePath);
      }
      return uploadedModuleImage;
    },
  },
};

export default courseResolvers;
