import CourseService from "../../services/implementations/courseService";
import {
  CourseRequestDTO,
  CourseResponseDTO,
  ICourseService,
} from "../../services/interfaces/ICourseService";

const courseService: ICourseService = new CourseService();

const courseResolvers = {
  Query: {
    course: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<CourseResponseDTO> => {
      return courseService.getCourse(id);
    },
    courses: async (): Promise<CourseResponseDTO[]> => {
      return courseService.getCourses();
    },
  },
  Mutation: {
    createCourse: async (
      _parent: undefined,
      { course }: { course: CourseRequestDTO },
    ): Promise<CourseResponseDTO> => {
      const newCourse = await courseService.createCourse(course);
      return newCourse;
    },
    updateCourse: async (
      _parent: undefined,
      { id, course }: { id: string; course: CourseRequestDTO },
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
