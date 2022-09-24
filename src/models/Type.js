import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model ('Type', userSchema);