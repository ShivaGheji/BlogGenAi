import React from "react";
import dayjs from "dayjs";

export default function BlogCard({ blog, onView, onDelete, onDownload }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
      <h3>{blog.title || "Untitled"}</h3>
      <div style={{ fontSize: 12, color: "#666" }}>
        {dayjs(blog.createdAt).format("YYYY-MM-DD HH:mm")} •{" "}
        {blog.wordCount || 0} words • {blog.tone || "—"}
      </div>
      <p>
        {blog.summary ||
          (blog.content ? blog.content.slice(0, 120) + "..." : "")}
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onView(blog._id || blog.id)}>View</button>
        <button onClick={() => onDownload(blog)}>Download</button>
        <button onClick={() => onDelete(blog._id || blog.id)}>Delete</button>
      </div>
    </div>
  );
}
