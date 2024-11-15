const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toLocaleString(), // Store date as a string in a readable format
  },
});

module.exports = mongoose.model("Post", PostSchema);
