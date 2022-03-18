import { AuthenticationError, ExpressContext } from "apollo-server-express";
import { v4 as uuidv4 } from "uuid";
import CourseService from "../../services/implementations/courseService";
import {
  CreateCourseRequestDTO,
  UpdateCourseRequestDTO,
  CourseResponseDTO,
  ICourseService,
  SerializedCourseResponseDTO,
  ModuleDTO,
  SerializedCreateCourseRequestDTO,
  SerializedUpdateCourseRequestDTO,
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
import { CourseVisibilityAttributes, Module } from "../../models/course.model";
import { assertNever } from "../../utilities/errorUtils";

const courseService: ICourseService = new CourseService();
const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

const serializeToModuleDTO = (modules: {
  [id: string]: Module;
}): ModuleDTO[] => {
  return Object.entries(modules).map(([key, val]) => ({ id: key, ...val }));
};

const deserializeModuleDTO = (
  moduleDTOs: ModuleDTO[],
): { [id: string]: Module } => {
  const modules: { [id: string]: Module } = {} as { [id: string]: Module };

  moduleDTOs.forEach((moduleDTO) => {
    const moduleObj = {
      title: moduleDTO.title,
      description: moduleDTO.description,
      image: moduleDTO.image,
      previewImage: moduleDTO.previewImage,
      published: moduleDTO.published,
      lessons: moduleDTO.lessons,
    };

    // If no UUID is defined, create one
    modules[moduleDTO?.id ?? uuidv4()] = moduleObj;
  });

  return modules;
};

const serializeCourseResponse = (
  course: CourseResponseDTO,
): SerializedCourseResponseDTO => {
  return {
    ...course,
    modules: serializeToModuleDTO(course.modules),
  };
};

const deserializeCourseRequest = (
  course: SerializedCreateCourseRequestDTO | SerializedUpdateCourseRequestDTO,
): CreateCourseRequestDTO | UpdateCourseRequestDTO => {
  return {
    ...course,
    modules: deserializeModuleDTO(course.modules),
  };
};

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
    ): Promise<SerializedCourseResponseDTO> => {
      return courseService
        .getCourse(id)
        .then((course) => serializeCourseResponse(course));
    },
    courses: async (
      _parent: any,
      _args: { [key: string]: any },
      context: ExpressContext,
    ): Promise<SerializedCourseResponseDTO[]> => {
      const accessToken = getAccessToken(context.req);
      if (!accessToken) {
        throw new AuthenticationError(
          "Failed authentication and/or authorization by role",
        );
      }

      const role = await authService.getUserRoleByAccessToken(accessToken);
      const attributes = getCourseVisibilityAttributes(role);

      return courseService
        .getCourses(attributes)
        .then((courses) => courses.map(serializeCourseResponse));
    },
  },
  Mutation: {
    createCourse: async (
      _parent: undefined,
      { course }: { course: SerializedCreateCourseRequestDTO },
    ): Promise<SerializedCourseResponseDTO> => {
      const newCourse = await courseService
        .createCourse(deserializeCourseRequest(course))
        .then(serializeCourseResponse);
      return newCourse;
    },
    updateCourse: async (
      _parent: undefined,
      { id, course }: { id: string; course: SerializedUpdateCourseRequestDTO },
    ): Promise<SerializedCourseResponseDTO | null> => {
      return courseService
        .updateCourse(id, deserializeCourseRequest(course))
        .then((unserializedCourse) => {
          return unserializedCourse
            ? serializeCourseResponse(unserializedCourse)
            : null;
        });
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
