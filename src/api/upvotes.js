const express = require("express");
const router = express.Router();
const Upvote = require("../../models/Upvote");

// Fetch upvotes for leaderboard
router.get("/:courseCode", async (req, res) => {
  try {
    const { courseCode } = req.params;
    const upvotes = await Upvote.find({ courseCode });
    res.json(upvotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update upvotes
router.post("/", async (req, res) => {
  const { postId, userId, courseCode, upvotes } = req.body;

  try {
    let upvote = await Upvote.findOne({ postId, userId, courseCode });

    if (upvote) {
      upvote.upvotes = upvotes;
      await upvote.save();
    } else {
      upvote = new Upvote({ postId, userId, courseCode, upvotes });
      await upvote.save();
    }

    res.json(upvote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
