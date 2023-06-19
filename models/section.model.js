import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const sectionSchema = new Schema(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  modelOptions
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;
