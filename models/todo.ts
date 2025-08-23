import { timeStamp } from "console";
import { Document, model, models, Schema } from "mongoose";

interface ITodo extends Document {
  title: String;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = models.TODO || model("Todo", todoSchema);
