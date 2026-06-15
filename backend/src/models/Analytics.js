import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["visitor", "project_click", "resume_download", "contact_submit"],
      required: true,
      index: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    ip: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.model("Analytics", analyticsSchema);
