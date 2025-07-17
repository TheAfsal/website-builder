const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { expressjwt: expressJwt } = require("express-jwt");
dotenv.config();

console.log(process.env.FRONTEND_URL);

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const JWT_SECRET = process.env.JWT_SECRET || "my_secret";

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

const ProjectSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: Object,
});
const Project = mongoose.model("Project", ProjectSchema);

const getTokenFromCookie = (req) => {
  console.log(req.cookie);
  
  return req.cookies["builder-id"] || null;
};

// Middleware to protect routes
app.use(
  expressJwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    getToken: getTokenFromCookie,
  }).unless({
    path: ["/api/users/register", "/api/users/login"],
  })
);

// Register endpoint
app.post("/api/users/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("builder-id", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3600000,
    });
    res.status(201).json({ user: { id: user._id, email: user.email }, token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login endpoint
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("builder-id", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3600000,
    });
    res.status(200).json({ user: { id: user._id, email: user.email }, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Verify token endpoint
app.get("/api/users/verify", async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error("Verify token error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});

// Logout endpoint
app.post("/api/users/logout", (req, res) => {
  res.clearCookie("builder-id", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

//
//
//
//
app.post("/api/projects/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const { data } = req.body;
  const userId = req.auth.userId;
  try {
    await Project.findOneAndUpdate(
      { projectId, userId },
      { projectId, userId, data },
      { upsert: true }
    );
    res.status(200).json({ message: "Project saved" });
  } catch (error) {
    console.error("Save project error:", error);
    res.status(500).json({ message: "Failed to save project" });
  }
});

// Load project
app.get("/api/projects/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const userId = req.auth.userId;
  try {
    const project = await Project.findOne({ projectId, userId });
    res.status(200).json(project ? project.data : null);
  } catch (error) {
    console.error("Load project error:", error);
    res.status(500).json({ message: "Failed to load project" });
  }
});

// List projects
app.get("/api/projects", async (req, res) => {
  const userId = req.auth.userId;
  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
