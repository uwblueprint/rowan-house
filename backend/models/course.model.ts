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
  modules: Module[];
  private: boolean;
  published: boolean;
}

export interface CourseVisibilityAttributes {
  private?: boolean;
  published?: boolean;
}

const ModuleSchema: Schema = new Schema({
  title: String,
  description: String,
  image: String,
  preview_image: String,
  published: {
    type: Boolean,
    default: false,
  },
  lessons: [String],
})

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
    type: [ModuleSchema],
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
