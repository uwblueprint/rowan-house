import { CourseResponse } from "../APIClients/types/CourseClientTypes";

export const DEFAULT_IMAGE =
  "https://res.cloudinary.com/practicaldev/image/fetch/s--JIe3p0M4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/093ewdrgyf1kedlhzs51.png";

/* eslint-disable import/prefer-default-export */

export const dummyCourses: Array<CourseResponse> = [
  {
    id: "abcdefg",
    title: "Preventing Domestic Abuse",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis enim, nisi,
      et vitae eget sed id accumsan. Nunc nunc nisi, convallis sed habitasse arcu, urna
      elementum amet. Tellus turpis id pharetra, vitae lacus, ac scelerisque sed suscipit.
      Justo, quam a porttitor elit rhoncus, vitae. Urna egestas commodo, ultrices est.
      Nisl volutpat, metus proin fermentum euismod condimentum vitae pellentesque. Orci.`,
    image: null,
    previewImage: null,
    private: false,
    published: false,
    modules: [
      {
        id: "a1",
        title:
          "Recognizing Signs of Abuse Recognizing Signs of Abuse Recognizing Signs of Abuse",
        published: true,
        image: DEFAULT_IMAGE,
        description: null,
        previewImage: null,
        lessons: null,
      },
      {
        id: "a2",
        title: "Recognizing Signs of Abuse",
        published: false,
        image: DEFAULT_IMAGE,
        description: null,
        previewImage: null,
        lessons: null,
      },
      {
        id: "a3",
        title: "Recognizing Signs of Abuse",
        published: true,
        image: DEFAULT_IMAGE,
        description: null,
        previewImage: null,
        lessons: null,
      },
    ],
  },
  {
    id: "jklmnop",
    title: "Preventing Domestic Abuse",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis enim, nisi,
      et vitae eget sed id accumsan. Nunc nunc nisi, convallis sed habitasse arcu, urna
      elementum amet. Tellus turpis id pharetra, vitae lacus, ac scelerisque sed suscipit.
      Justo, quam a porttitor elit rhoncus, vitae. Urna egestas commodo, ultrices est.
      Nisl volutpat, metus proin fermentum euismod condimentum vitae pellentesque. Orci.`,
    image: null,
    previewImage: null,
    private: false,
    published: false,
    modules: [
      {
        id: "b1",
        title: "Recognizing Signs",
        published: false,
        image: DEFAULT_IMAGE,
        description: null,
        previewImage: null,
        lessons: null,
      },
      {
        id: "b2",
        title: "Recognizing",
        published: false,
        image: DEFAULT_IMAGE,
        description: null,
        previewImage: null,
        lessons: null,
      },
      {
        id: "b3",
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
