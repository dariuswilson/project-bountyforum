const express = require("express");
const router = express.Router();
const Upvote = require("../../models/Upvote");

// Fetch upvotes for leaderboard
// Fetch leaderboard data with aggregated upvotes for each user in a course
router.get("/:courseCode", async (req, res) => {
  try {
    const { courseCode } = req.params;

    const leaderboard = await Upvote.aggregate([
      { $match: { courseCode } },
      {
        $group: {
          _id: "$userId",
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
      { $sort: { totalUpvotes: -1 } },
      { $limit: 10 },
    ]);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch replies with current upvotes for a specific post
router.get("/replies/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const replies = await Upvote.find({ postId });
    res.json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update upvotes
router.post("/", async (req, res) => {
  const { postId, userId, courseCode, upvotes } = req.body;

  console.log("Received upvote data:", req.body);

  try {
    let upvote = await Upvote.findOne({ postId, userId, courseCode });

    if (upvote) {
      upvote.upvotes = upvotes;
      await upvote.save();
      console.log("Updated upvote:", upvote); // Debu
    } else {
      upvote = new Upvote({ postId, userId, courseCode, upvotes });
      await upvote.save();
      console.log("Saved new upvote:", upvote); // Debug
    }

    res.json(upvote);
  } catch (err) {
    console.error("Error saving upvote:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
