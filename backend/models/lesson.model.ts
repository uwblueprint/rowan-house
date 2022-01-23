import mongoose, { Schema, Document } from "mongoose";

export interface Lesson extends Document {
  id: string;
  course: string;
  title: string;
  description: string;
  image: string;
  content: [Object];
}

const LessonSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  content: {
    type: [Object],
    required: true,
  },
});

export default mongoose.model<Lesson>("Lesson", LessonSchema);

