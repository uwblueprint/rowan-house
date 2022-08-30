export type CourseProgressResponse = {
  startedAt?: Date;
  completedAt?: Date;
};

export type ModuleProgressResponse = {
  startedAt?: Date;
  completedAt?: Date;
};

export type LessonProgressResponse = {
  lessonId: string;
  completedAt?: Date;
};
