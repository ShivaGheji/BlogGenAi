import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
  generateBlog,
  listBlogs,
  getBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import rateLimiter from "../utils/rateLimit.js";

const blogRoutes = express.Router();

blogRoutes.post("/generate", requireAuth, rateLimiter, generateBlog);
blogRoutes.get("/", requireAuth, listBlogs);
blogRoutes.get("/:id", requireAuth, getBlog);
blogRoutes.delete("/:id", requireAuth, deleteBlog);

export default blogRoutes;
