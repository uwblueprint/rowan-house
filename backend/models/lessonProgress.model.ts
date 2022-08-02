import { Schema, Document, model, Types } from "mongoose";

export interface LessonProgress extends Document {
  user: Types.ObjectId;
  lesson: Types.ObjectId;
  completedAt: Date;
}

const LessonProgressSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  lesson: {
    type: Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  completedAt: Date,
});

export default model<LessonProgress>("LessonProgress", LessonProgressSchema);
