// src/api/routes/repliesRoutes.js

const express = require("express");
const router = express.Router();
const Reply = require("../../models/Reply");

// Add a new reply
router.post("/", async (req, res) => {
  const { postId, text, username } = req.body;

  try {
    const newReply = new Reply({
      postId,
      text,
      username,
      upvotes: 0,
      date: new Date().toLocaleString(),
    });

    await newReply.save();
    res.json(newReply);
  } catch (err) {
    console.error("Error saving reply:", err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get all replies for a specific post
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const replies = await Reply.find({ postId });
    res.json(replies);
  } catch (err) {
    console.error("Error fetching replies:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
