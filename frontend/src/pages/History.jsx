import React, { useEffect, useState } from "react";
import { listBlogs, deleteBlog } from "../api/blogService";
import BlogCard from "../components/BlogCard";
import { NoBlogsYet } from "../components/NoBlogComponents";
import { HistoryLoading } from "../components/LoadingComponents";
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
      window.__showToast__ &&
        window.__showToast__("Blog deleted successfully", "success");
      setBlogs((b) => b.filter((x) => (x._id || x.id) !== id));
    } catch (err) {
      window.__showToast__ &&
        window.__showToast__(
          "Failed to delete blog, please try again",
          "warning"
        );
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
    window.__showToast__ &&
      window.__showToast__("Blog downloaded successfully", "success");
  };

  const handleCopy = async (blog) => {
    if (!blog?.content) return;
    await navigator.clipboard.writeText(blog.content);
    window.__showToast__ &&
      window.__showToast__("Blog content copied to clipboard", "success");
  };

  const handleView = (id) => nav(`/blogs/${id}`);

  if (loading) return <HistoryLoading />;

  return (
    <div
      className="bg-[#fffbef] min-h-screen p-6 font-sans"
      style={{ fontFamily: "Lora, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl md:text-3xl font-bold text-[#5f471d] mb-1">
              Your Generated Blogs
            </h2>
            <p className="text-sm md:text-base text-[#5f471d]">
              Manage and view your previously generated blog posts
            </p>
          </div>
          <button
            onClick={() => nav("/dashboard")}
            className="bg-[#f7ce86] text-[#5b4824] px-3 md:px-4 py-2 rounded-[0.875rem] hover:bg-[#f9dea9] transition-colors duration-200 flex items-center gap-1 md:gap-2 text-sm md:text-base"
          >
            <span>+</span> New Blog
          </button>
        </div>
        <div className="space-y-4">
          {blogs.length === 0 ? (
            <NoBlogsYet />
          ) : (
            blogs.map((b) => (
              <BlogCard
                key={b._id || b.id}
                blog={b}
                onView={handleView}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onCopy={handleCopy}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
