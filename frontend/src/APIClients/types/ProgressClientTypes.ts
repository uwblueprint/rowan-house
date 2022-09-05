export type CourseProgressResponse = {
  startedAt?: Date;
  completedAt?: Date;
};

export type LessonProgressResponse = {
  lessonId: string;
  completedAt?: Date;
};
export interface ModuleProgress {
  startedAt?: Date;
  completedAt?: Date;
}
export interface ModuleProgressRequest {
  userId: string;
  courseId: string;
}
export interface ModuleProgressResponse {
  moduleProgress: ModuleProgress[];
}
