import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filename: {
      type: String,
      required: true,  
    },
    originalName: String,
    mimeType: String,
    b2FileId: String,
    storageUrl: String,

    size: {
      type: Number, // bytes
      required: true,
    },

    access: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    publicLink: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

fileSchema.index({ owner: 1 });

export default mongoose.model("File", fileSchema);
