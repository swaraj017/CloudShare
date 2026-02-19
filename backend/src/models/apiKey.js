import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    key: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      default: "default",
    },
    lastUsedAt: Date,
    
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ApiKey", apiKeySchema);
