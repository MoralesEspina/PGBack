import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/gasdanerydb")
  .then((db) => console.log("DB is connected"))
  .catch((error) => console.log(error));
