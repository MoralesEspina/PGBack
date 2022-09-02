import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    types: [
      {
        ref: "Type",
        type: Schema.Types.String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model ('Category', userSchema);