const mongoose = require("mongoose");

const UpvoteSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  courseCode: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Upvote", UpvoteSchema);
