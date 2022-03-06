import { Schema, Document, model } from "mongoose";

export interface Course extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  lessons: [string];
  private: boolean;
  published: boolean;
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
  lessons: {
    type: [String],
    required: true,
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
