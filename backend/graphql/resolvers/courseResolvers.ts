import { AuthenticationError, ExpressContext } from "apollo-server-express";
import CourseService from "../../services/implementations/courseService";
import {
<<<<<<< Updated upstream
  CreateCourseRequestDTO,
  UpdateCourseRequestDTO,
=======
  SerializedCourseRequestDTO,
>>>>>>> Stashed changes
  CourseResponseDTO,
  ICourseService,
  CourseRequestDTO,
  SerializedCourseResponseDTO,
  ModuleDTO,
} from "../../services/interfaces/ICourseService";
<<<<<<< Updated upstream
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
=======
import { Module } from "../../models/course.model";
import { v4 as uuidv4 } from 'uuid';
>>>>>>> Stashed changes

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
    ): Promise<SerializedCourseResponseDTO> => {
      return courseService.getCourse(id).then(course => serializeCourseResponse(course));
    },
<<<<<<< Updated upstream
    courses: async (context: ExpressContext): Promise<CourseResponseDTO[]> => {
      const accessToken = getAccessToken(context.req);
      if (!accessToken) {
        throw new AuthenticationError(
          "Failed authentication and/or authorization by role",
        );
      }

      const role = await authService.getUserRoleByAccessToken(accessToken);
      const attributes = getCourseVisibilityAttributes(role);

      return courseService.getCourses(attributes);
=======
    courses: async (): Promise<SerializedCourseResponseDTO[]> => {
      return courseService.getCourses().then(courses => courses.map(serializeCourseResponse));
>>>>>>> Stashed changes
    },
  },
  Mutation: {
    createCourse: async (
      _parent: undefined,
<<<<<<< Updated upstream
      { course }: { course: CreateCourseRequestDTO },
    ): Promise<CourseResponseDTO> => {
      const newCourse = await courseService.createCourse(course);
=======
      { course }: { course: SerializedCourseRequestDTO },
    ): Promise<SerializedCourseResponseDTO> => {
      const newCourse = await courseService.createCourse(deserializeCourseRequest(course)).then(serializeCourseResponse);
>>>>>>> Stashed changes
      return newCourse;
    },
    updateCourse: async (
      _parent: undefined,
<<<<<<< Updated upstream
      { id, course }: { id: string; course: UpdateCourseRequestDTO },
    ): Promise<CourseResponseDTO | null> => {
      return courseService.updateCourse(id, course);
=======
      { id, course }: { id: string; course: SerializedCourseRequestDTO },
    ): Promise<SerializedCourseResponseDTO | null> => {
      return courseService.updateCourse(id, deserializeCourseRequest(course)).then(course => {
        if (course) return serializeCourseResponse(course)
        else return null
      });
>>>>>>> Stashed changes
    },
    deleteCourse: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<string> => {
      return courseService.deleteCourse(id);
    },
  },
};

function serializeToModuleDTO(modules: {[id: string]: Module}): ModuleDTO[] {
  return Object.entries(modules).map(([key, val]) => ({id: key, ...val}))
}

function deserializeModuleDTO(moduleDTOs: ModuleDTO[]): {[id: string]: Module} {
  let modules: {[id: string]: Module} = {} as {[id: string]: Module};

  moduleDTOs.forEach(moduleDTO => {
    let moduleObj = {
      title: moduleDTO.title,
      description: moduleDTO.description,
      image: moduleDTO.image,
      preview_image: moduleDTO.preview_image,
      published: moduleDTO.published,
      lessons: moduleDTO.lessons
    }

    // If no UUID is defined, create one
    modules[moduleDTO?.id ?? uuidv4()] = moduleObj;
  })

  return modules;
}

function serializeCourseResponse(course: CourseResponseDTO): SerializedCourseResponseDTO {
  if (course?.modules) {
    return {
      ...course,
      modules: serializeToModuleDTO(course.modules)
    }
  } else {
    return {
      ...course,
      modules: []
    }
  }
}

function deserializeCourseRequest(course: SerializedCourseRequestDTO): CourseRequestDTO {
  if (course?.modules) {
    return {
      ...course,
      modules: deserializeModuleDTO(course.modules)
    }
  } else {
    return {
      ...course,
      modules: {}
    }
  }

}

export default courseResolvers;
