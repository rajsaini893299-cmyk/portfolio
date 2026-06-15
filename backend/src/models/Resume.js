import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export default mongoose.model("Resume", resumeSchema);
