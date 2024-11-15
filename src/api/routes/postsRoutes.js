// src/api/routes/postsRoutes.js
const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

// Get all posts for a specific course
router.get("/:courseCode", async (req, res) => {
  try {
    const posts = await Post.find({ courseCode: req.params.courseCode });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create a new post
router.post("/", async (req, res) => {
  const { courseCode, title, description } = req.body;
  try {
    const newPost = new Post({
      courseCode,
      title,
      description,
      date: new Date().toLocaleString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

module.exports = router;
