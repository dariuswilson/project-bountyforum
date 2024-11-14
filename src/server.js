const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const upvoteRoutes = require("./api/routes/upvoteRoutes");
const repliesRoutes = require("./api/routes/repliesRoutes");

// Use routes
app.use("/api/upvotes", upvoteRoutes);
app.use("/api/replies", repliesRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
