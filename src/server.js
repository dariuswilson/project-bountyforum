const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://project-bountyforum.vercel.app", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const upvoteRoutes = require("./api/routes/upvoteRoutes");
const repliesRoutes = require("./api/routes/repliesRoutes");
const postsRoutes = require("./api/routes/postsRoutes");

// Use routes
app.use("/api/upvotes", upvoteRoutes);
app.use("/api/replies", repliesRoutes);
app.use("/api/posts", postsRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Set up the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
