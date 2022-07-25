import { Schema, Document, model, Types } from "mongoose";

export interface CourseProgress extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  startedAt: Date;
  completedAt: Date;
}

const CourseProgressSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: Types.ObjectId,
    ref: "Course",
    required: true,
  },
  startedAt: Date,
  completedAt: Date,
});

export default model<CourseProgress>("CourseProgress", CourseProgressSchema);
