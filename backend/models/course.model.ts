import { Schema, Document, model, Types } from "mongoose";
import { FileUpload } from "graphql-upload";

export interface Module {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  published: boolean;
  lessons: string[];
  file: Promise<FileUpload>;
  fileName: string;
  filePath: string;
  fileContentType: string;
}

export interface Course extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  modules: (Module | null)[];
  private: boolean;
}

export interface CourseVisibilityAttributes {
  includePrivateCourses: boolean;
  includeOnlyPublishedModules: boolean;
}

const ModuleSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  preview_image: String,
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
  lessons: [String],
  fileName: {
    type: String,
  },
});

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
});

export default model<Course>("Course", CourseSchema);
