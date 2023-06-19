import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const taskSchema = new Schema(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
    },
  },
  modelOptions
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
