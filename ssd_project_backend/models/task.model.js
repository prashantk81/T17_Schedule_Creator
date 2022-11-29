const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const task = new Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    no_of_days: {
      type: String,
      required: true,
    },
    activity_duration: {
      type: String,
      required: false,
    },
    activity: {
      type: [],
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", task);

module.exports = Task;
