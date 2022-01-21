import { Schema, Document, model } from "mongoose";

export interface Course extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
  lessons: [string];
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
});

export default model<Course>("Course", CourseSchema);
