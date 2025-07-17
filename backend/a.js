// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const helmet = require("helmet");
// const dotenv = require("dotenv");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser");
// const { expressjwt: expressJwt } = require("express-jwt");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// dotenv.config();

// console.log(process.env.FRONTEND_URL);

// const app = express();
// const PORT = process.env.PORT || 3000;
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// const JWT_SECRET = process.env.JWT_SECRET || "my_secret";
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// app.use(cors({ origin: FRONTEND_URL, credentials: true }));
// app.use(cookieParser());
// app.use(helmet());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const UserSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
// });
// const User = mongoose.model("User", UserSchema);

// const ProjectSchema = new mongoose.Schema({
//   projectId: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   data: Object,
// });
// const Project = mongoose.model("Project", ProjectSchema);

// const getTokenFromCookie = (req) => {
//   console.log(req.cookie);

//   return req.cookies["builder-id"] || null;
// };

// // Middleware to protect routes
// app.use(
//   expressJwt({
//     secret: JWT_SECRET,
//     algorithms: ["HS256"],
//     getToken: getTokenFromCookie,
//   }).unless({
//     path: ["/api/users/register", "/api/users/login"],
//   })
// );

// // Register endpoint
// app.post("/api/users/register", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword });
//     await user.save();
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.cookie("builder-id", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 3600000,
//     });
//     res.status(201).json({ user: { id: user._id, email: user.email }, token });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: "Registration failed" });
//   }
// });

// // Login endpoint
// app.post("/api/users/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.cookie("builder-id", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 3600000,
//     });
//     res.status(200).json({ user: { id: user._id, email: user.email }, token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Login failed" });
//   }
// });

// // Verify token endpoint
// app.get("/api/users/verify", async (req, res) => {
//   try {
//     const user = await User.findById(req.auth.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ user: { id: user._id, email: user.email } });
//   } catch (error) {
//     console.error("Verify token error:", error);
//     res.status(500).json({ message: "Verification failed" });
//   }
// });

// // Logout endpoint
// app.post("/api/users/logout", (req, res) => {
//   res.clearCookie("builder-id", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//   });
//   res.status(200).json({ message: "Logged out successfully" });
// });

// //
// //
// //
// //
// app.post("/api/projects/:projectId", async (req, res) => {
//   const { projectId } = req.params;
//   const { data } = req.body;
//   const userId = req.auth.userId;
//   try {
//     await Project.findOneAndUpdate(
//       { projectId, userId },
//       { projectId, userId, data },
//       { upsert: true }
//     );
//     res.status(200).json({ message: "Project saved" });
//   } catch (error) {
//     console.error("Save project error:", error);
//     res.status(500).json({ message: "Failed to save project" });
//   }
// });

// // Load project
// app.get("/api/projects/:projectId", async (req, res) => {
//   const { projectId } = req.params;
//   const userId = req.auth.userId;
//   try {
//     const project = await Project.findOne({ projectId, userId });
//     res.status(200).json(project ? project.data : null);
//   } catch (error) {
//     console.error("Load project error:", error);
//     res.status(500).json({ message: "Failed to load project" });
//   }
// });

// // List projects
// app.get("/api/projects", async (req, res) => {
//   const userId = req.auth.userId;
//   try {
//     const projects = await Project.find({ userId });
//     res.status(200).json(projects);
//   } catch (error) {
//     console.error("Fetch projects error:", error);
//     res.status(500).json({ message: "Failed to fetch projects" });
//   }
// });

// app.post("/api/generate", async (req, res) => {
//   const { inputText, selectedHtml } = req.body;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const prompt = `
// You are an expert UI assistant for GrapesJS (a web visual editor). Your job is to interpret user instructions and generate a JSON response to manipulate selected components in GrapesJS.

// **Rules:**
// - Respond ONLY with JSON. No extra text, markdown, or explanation.
// - The JSON must be valid and follow one of the following actions: "updateStyle", "updateContent", "replaceMedia", "rebuildComponent", "deleteComponent".
// - Use "body" or the actual selected component ID as the selector.

// **Format examples:**

// {
//   "action": "updateStyle",
//   "payload": {
//     "selector": "body" or "component-id",
//     "style": {
//       "background-color": "pink"
//     }
//   }
// }

// {
//   "action": "updateContent",
//   "payload": {
//     "content": "<h1>Updated Title</h1>"
//   }
// }

// {
//   "action": "rebuildComponent",
//   "payload": {
//     "html": "<section style='padding:20px; background-color:green;'><h1>Welcome</h1><p>This is editable.</p></section>"
//   }
// }

// **User Instruction:**
// "${inputText}"

// **Selected Component HTML:**
// ${selectedHtml}
//     `.trim();

//     const result = await model.generateContent([prompt]);
//     const response = await result.response;
//     const text = response.text();

//     const cleanedText = text.replace(/```json|```/g, "").trim();
//     const json = JSON.parse(cleanedText);

//     res.status(200).json(json);
//   } catch (err) {
//     console.error("Gemini API error:", err);
//     res.status(500).json({ action: "unknown", payload: {} });
//   }
// });

// app.post("/api/generate-website", async (req, res) => {
//   const { websiteType, theme, language, requirements } = req.body;

//   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//   const prompt = `
// You are a professional web UI designer helping generate GrapesJS-compatible HTML content.

// Task:
// Generate a complete and editable HTML layout for a "${websiteType}" website using "${theme}" theme and "${language}" as the language. Include these sections if applicable:
// - Header with navigation
// - Hero section with image and CTA button
// - Product or service cards
// - Testimonials
// - Footer

// Requirements:
// ${requirements || "Basic structure with common UI components"}

// Rules:
// - Return only raw HTML. No Markdown, no CSS blocks, no JavaScript.
// - Use semantic HTML5 tags (e.g., <header>, <section>, <footer>)
// - Content must be editable in GrapesJS (no hardcoded styles inside <style> tags)
// - Use inline styles or TailwindCSS classes (if possible)
// - No explanation, return pure HTML only.
//   `;

//   try {
//     const result = await model.generateContent([prompt]);
//     let html = result.response.text().trim();
//     html = html.replace(/^```html\n([\s\S]*?)\n```$/, "$1").trim();

//     return res.json({ html });
//   } catch (error) {
//     console.error("Gemini generation error:", error);
//     return res.status(500).json({ error: "Generation failed" });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
