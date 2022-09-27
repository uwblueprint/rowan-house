import { v4 as uuid } from "uuid";

import { CourseResponse } from "../APIClients/types/CourseClientTypes";
import { LessonsType } from "../types/ModuleEditorTypes";
import { ContentTypeEnum } from "../types/ContentBlockTypes";

export const DEFAULT_IMAGE = "/RHSlogo.png";

/* eslint-disable import/prefer-default-export */

export const dummyCourses: Array<CourseResponse> = [
  {
    id: "empty-course",
    title: "Preventing Domestic Abuse",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis enim, nisi,
      et vitae eget sed id accumsan. Nunc nunc nisi, convallis sed habitasse arcu, urna
      elementum amet. Tellus turpis id pharetra, vitae lacus, ac scelerisque sed suscipit.
      Justo, quam a porttitor elit rhoncus, vitae. Urna egestas commodo, ultrices est.
      Nisl volutpat, metus proin fermentum euismod condimentum vitae pellentesque. Orci.`,
    image: null,
    previewImage: null,
    private: false,
    modules: [],
  },
  {
    id: "course-hash-1",
    title: "Preventing Domestic Abuse",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis enim, nisi,
      et vitae eget sed id accumsan. Nunc nunc nisi, convallis sed habitasse arcu, urna
      elementum amet. Tellus turpis id pharetra, vitae lacus, ac scelerisque sed suscipit.
      Justo, quam a porttitor elit rhoncus, vitae. Urna egestas commodo, ultrices est.
      Nisl volutpat, metus proin fermentum euismod condimentum vitae pellentesque. Orci.`,
    image: null,
    previewImage: null,
    private: false,
    modules: [
      {
        id: "module-hash-1",
        title: "Recognizing Signs",
        published: false,
        image: DEFAULT_IMAGE,
        description: null,
        previewImage: null,
        lessons: ["lesson-hash-1", "lesson-hash-2"],
      },
      {
        id: "module-hash-2",
        title: "Recognizing",
        published: false,
        image: DEFAULT_IMAGE,
        description: null,
        previewImage: null,
        lessons: null,
      },
      {
        id: "module-hash-3",
        title: "Recognizing Signs of",
        published: true,
        image: DEFAULT_IMAGE,
        description: null,
        previewImage: null,
        lessons: null,
      },
    ],
  },
];

export const dummyLessons: LessonsType = {
  "lesson-hash-1": {
    course: "course-hash-1",
    module: "module-hash-1",
    title: "Dummy Lesson 1",
    description: "Blah",
    image: "",
    content: [
      {
        type: ContentTypeEnum.TEXT,
        id: uuid(),
        content: {
          text: `[
            {
              type: "paragraph",
              align: "left",
              children: [{ text: "" }],
            },
          ]`,
        },
      },
      {
        type: ContentTypeEnum.IMAGE,
        id: uuid(),
        content: {
          link:
            "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        },
      },
      {
        type: ContentTypeEnum.TEXT,
        id: uuid(),
        content: {
          text: `[
            {
              type: "paragraph",
              align: "left",
              children: [{ text: "" }],
            },
          ]`,
        },
      },
    ],
  },
  "lesson-hash-2": {
    course: "course-hash-1",
    module: "module-hash-1",
    title: "Dummy Lesson 2",
    description: "Blah",
    image: "",
    content: [
      {
        type: ContentTypeEnum.TEXT,
        id: uuid(),
        content: {
          text: `[
            {
              type: "paragraph",
              align: "left",
              children: [{ text: "" }],
            },
          ]`,
        },
      },
    ],
  },
};
