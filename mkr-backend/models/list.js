import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const List = mongoose.model("List", listSchema);
