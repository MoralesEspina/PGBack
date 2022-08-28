import { Schema, model } from "mongoose";

export const ROLES = ["admin", "dealer", "secretary"]

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
