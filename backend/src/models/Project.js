import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "Full Stack",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    liveLink: {
      type: String,
      trim: true,
      default: "",
    },
    githubLink: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export default mongoose.model("Project", projectSchema);
