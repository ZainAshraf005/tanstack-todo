import { Document, model, models, Schema } from "mongoose";

interface ITodo extends Document {
  title: string;
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
