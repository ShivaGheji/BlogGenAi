import React, { useEffect, useState } from "react";
import { listBlogs, deleteBlog } from "../api/blogService";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await listBlogs();
      setBlogs(res.data.items || []);
    } catch (err) {
      window.__showToast__ &&
        window.__showToast__("Failed to load history", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id);
      window.__showToast__ && window.__showToast__("Deleted", "success");
      setBlogs((b) => b.filter((x) => (x._id || x.id) !== id));
    } catch (err) {
      window.__showToast__ && window.__showToast__("Delete failed", "error");
    }
  };

  const handleDownload = (blog) => {
    const blob = new Blob([blog.content || ""], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(blog.title || "blog").replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
    window.__showToast__ && window.__showToast__("Downloaded", "success");
  };

  const handleView = (id) => nav(`/blogs/${id}`);

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Your Generated Blogs</h2>
      <div>
        <button onClick={() => nav("/dashboard")}>New Blog</button>
      </div>
      <div style={{ marginTop: 12 }}>
        {blogs.length === 0 ? (
          <div>No blogs yet</div>
        ) : (
          blogs.map((b) => (
            <BlogCard
              key={b._id || b.id}
              blog={b}
              onView={handleView}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ))
        )}
      </div>
    </div>
  );
}
