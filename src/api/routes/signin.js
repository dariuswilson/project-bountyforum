const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User"); // User model
const router = express.Router();

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // If valid, respond with success message or token
    res
      .status(200)
      .json({ message: "Sign-in successful!", user: user.username });
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Server error, try again later." });
  }
});

module.exports = router;
