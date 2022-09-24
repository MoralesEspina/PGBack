import mongoose from "mongoose";
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((db) => console.log("DB is connected"))
  .catch((error) => console.log(error));
