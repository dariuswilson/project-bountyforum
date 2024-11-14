// src/models/Reply.js

const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("Reply", ReplySchema);
