import { Schema, Document, model } from "mongoose";

export interface Module {
  title: string
  description: string
  image: string
  preview_image: string
  published: Boolean
  lessons: string[]
}

export interface Course extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage: string;
<<<<<<< Updated upstream
  lessons: [string];
  private: boolean;
  published: boolean;
}

export interface CourseVisibilityAttributes {
  private?: boolean;
  published?: boolean;
=======
  modules: {[id: string]: Module}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
  modules: {
    type: {
      title: String,
      description: String,
      image: String,
      preview_image: String,
      published: Boolean,
      lessons: [String]
    }
  }
>>>>>>> Stashed changes
});

export default model<Course>("Course", CourseSchema);
