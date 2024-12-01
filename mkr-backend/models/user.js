import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    password: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
