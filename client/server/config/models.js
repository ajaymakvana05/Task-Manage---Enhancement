import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  assignee: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" },
  dueDate: Date,
});

const Task = model("Task", TaskSchema);

const UserSchema = new Schema({
  name: String,
  email: String,
  deviceToken: String,  
});

const User = model("User", UserSchema);

export { Task, User };
