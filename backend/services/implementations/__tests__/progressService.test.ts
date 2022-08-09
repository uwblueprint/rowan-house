import CourseModel from "../../../models/course.model";
import CourseProgressModel from "../../../models/courseProgress.model";
import UserModel from "../../../models/user.model";
import ProgressService from "../progressService";

import db from "../../../testUtils/testDb";

const testUser = {
  firstName: "Yi Lin",
  lastName: "Li",
  authId: "none",
  role: "Learner",
  town: "none",
};

const testModules = [
  {
    published: true,
    lessons: [],
    title: "The First Module",
    description: "The first module",
    image: null,
  },
  {
    published: true,
    lessons: [],
    title: "The Second Module",
    description: "The second module",
    image: null,
  },
  {
    published: true,
    lessons: [],
    title: "The Third Module",
    description: "The third module",
    image: null,
  },
];
const testCourse = {
  id: 1,
  private: false,
  title: "Preventing Domestic Abuse",
  description: "Woah this is certainly a course.",
  modules: testModules,
  image: null,
  previewImage: null,
};

jest.mock("firebase-admin", () => {
  const auth = jest.fn().mockReturnValue({
    getUser: jest.fn().mockReturnValue({ email: "test@test.com" }),
  });
  return { auth };
});

describe("mongo progressService", (): void => {
  let progressService: ProgressService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    progressService = new ProgressService();
  });

  afterEach(async () => {
    await db.clear();
  });

  it("markModuleAsCompletedForUser", async () => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const user = await UserModel.create(testUser);
    const course = await CourseModel.create(testCourse);

    await progressService.markModuleAsCompletedForUser(user.id, course.id, 1);
    let courseProgress = await CourseProgressModel.findOne({
      user: user.id,
      course: course.id,
    });
    expect(courseProgress).not.toBeNull();
    expect(courseProgress!.completedAt).toBeUndefined();
    expect(courseProgress!.moduleProgress.length).toBe(2);
    expect(courseProgress!.moduleProgress[0]).toBeNull();
    expect(courseProgress!.moduleProgress[1]).not.toBeNull();
    expect(courseProgress!.moduleProgress[1]!.completedAt).toBeDefined();

    await progressService.markModuleAsCompletedForUser(user.id, course.id, 0);
    await progressService.markModuleAsCompletedForUser(user.id, course.id, 2);
    courseProgress = await CourseProgressModel.findOne({
      user: user.id,
      course: course.id,
    });
    expect(courseProgress!.completedAt).toBeDefined();
    expect(courseProgress!.moduleProgress[0]).not.toBeNull();
    expect(courseProgress!.moduleProgress[0]!.completedAt).toBeDefined();
    expect(courseProgress!.moduleProgress[1]).not.toBeNull();
    expect(courseProgress!.moduleProgress[1]!.completedAt).toBeDefined();
    expect(courseProgress!.moduleProgress[2]).not.toBeNull();
    expect(courseProgress!.moduleProgress[2]!.completedAt).toBeDefined();
  });
});
