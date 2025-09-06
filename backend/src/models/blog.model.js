// src/models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  prompt: { type: String, required: true },
  tone: { type: String, default: "Neutral" },
  targetAudience: { type: String, default: "" },
  keywords: { type: [String], default: [] },
  wordCount: { type: Number, default: 0 },
  content: { type: String, required: true }, // stored as Markdown
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
