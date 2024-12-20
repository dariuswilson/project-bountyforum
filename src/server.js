const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://project-bountyforum.vercel.app", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, content-type, application/json"
  );
  next();
});

// Import routes
const upvoteRoutes = require("./api/routes/upvoteRoutes");
const repliesRoutes = require("./api/routes/repliesRoutes");
const postsRoutes = require("./api/routes/postsRoutes");
const signupRoutes = require("./api/routes/signup");
const signinRoutes = require("./api/routes/signin");
// Use routes
app.use("/api/upvotes", upvoteRoutes);
app.use("/api/replies", repliesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/sign-up", signupRoutes);
app.use("/sign-in", signinRoutes);

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
