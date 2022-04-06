import mongoose, { Schema, Document } from "mongoose";
import { ContentBlock } from "../types";

export interface Lesson extends Document {
  id: string;
  course: string;
  module: string;
  title: string;
  description: string;
  image: string;
  content: [ContentBlock];
}

const LessonSchema: Schema = new Schema({
  course: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
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
  content: {
    type: [Schema.Types.Mixed],
    required: true,
  },
});

export default mongoose.model<Lesson>("Lesson", LessonSchema);
