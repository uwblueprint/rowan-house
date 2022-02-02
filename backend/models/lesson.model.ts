import mongoose, { Schema, Document } from "mongoose";

// TO DO: Update content type

export interface Lesson extends Document {
  id: string;
  course: string;
  title: string;
  description: string;
  image: string;
  content: [Record<string, unknown>];
}

const LessonSchema: Schema = new Schema({
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
