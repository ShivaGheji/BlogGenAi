// src/controllers/blogController.js
import Blog from "../models/blog.model.js";
import { generateBlogFromPrompt } from "../services/gemini.service.js";
import {
  generateBlogSchema,
  listBlogsSchema,
  idSchema,
} from "../schemas/blog.schema.js";

export async function generateBlog(req, res, next) {
  try {
    const { prompt, tone, targetAudience, keywords } = generateBlogSchema.parse(
      req.body
    );

    const content = await generateBlogFromPrompt({
      prompt,
      tone,
      targetAudience,
      keywords,
    });

    const wordCount = content.contentMarkdown
      .split(/\s+/)
      .filter(Boolean).length;

    const blog = new Blog({
      user: req.user.id,
      title: content.title || "Untitled Blog",
      prompt,
      tone,
      targetAudience,
      keywords,
      wordCount,
      content: content.contentMarkdown || "",
      summary: content.summary || "",
    });

    await blog.save();

    return res.status(201).json({
      status: "success",
      data: blog,
    });
  } catch (err) {
    next(err);
  }
}

export async function listBlogs(req, res, next) {
  try {
    const { page, limit } = listBlogsSchema.parse(req.query);
    const pageInt = Number(page || 1);
    const limitInt = Number(limit || 12);
    const skip = (pageInt - 1) * limitInt;

    const [items, total] = await Promise.all([
      Blog.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitInt)
        .select("title createdAt wordCount tone summary")
        .lean(),
      Blog.countDocuments({ user: req.user.id }),
    ]);

    return res.json({
      status: "success",
      data: { items, total, page: pageInt, limit: limitInt },
    });
  } catch (err) {
    next(err);
  }
}

export async function getBlog(req, res, next) {
  try {
    const { id } = idSchema.parse(req.params);
    const blog = await Blog.findOne({ _id: id, user: req.user.id }).lean();
    if (!blog)
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found" });
    return res.json({ status: "success", data: blog });
  } catch (err) {
    next(err);
  }
}

export async function deleteBlog(req, res, next) {
  try {
    const { id } = idSchema.parse(req.params);
    const deleted = await Blog.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deleted)
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found" });
    return res.json({ status: "success", message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
