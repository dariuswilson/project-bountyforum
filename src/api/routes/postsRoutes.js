// src/api/routes/postsRoutes.js
const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

// Route to get a single post by postId
router.get("/post/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId); // Find post by its unique _id
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Route to get posts by course code
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
