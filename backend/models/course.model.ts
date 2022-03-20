import { Schema, Document, model } from "mongoose";

export interface Module {
  title: string;
  description: string;
  image: string;
  previewImage: string;
  published: boolean;
  lessons: string[];
}

export interface Course extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: { [id: string]: Module };
  private: boolean;
  published: boolean;
}

export interface CourseVisibilityAttributes {
  private?: boolean;
  published?: boolean;
}

const CourseSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  previewImage: {
    type: String,
  },
  modules: {
    type: {
      title: String,
      description: String,
      image: String,
      preview_image: String,
      published: Boolean,
      lessons: [String],
    },
  },
  private: {
    type: Boolean,
    default: true,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default model<Course>("Course", CourseSchema);
