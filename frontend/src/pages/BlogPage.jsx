import React, { useEffect, useState } from "react";
import { getBlog, deleteBlog } from "../api/blogService";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ReactMarkdown from "react-markdown";

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getBlog(id);
        setBlog(res.data);
      } catch (err) {
        window.__showToast__ &&
          window.__showToast__("Failed to load blog", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onDelete = async () => {
    if (!confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id);
      window.__showToast__ && window.__showToast__("Deleted", "success");
      nav("/history");
    } catch (err) {
      window.__showToast__ && window.__showToast__("Delete failed", "error");
    }
  };

  const onCopy = async () => {
    if (!blog?.content) return;
    await navigator.clipboard.writeText(blog.content);
    window.__showToast__ && window.__showToast__("Copied", "success");
  };

  const onDownload = (ext = "md") => {
    const blob = new Blob([blog.content || ""], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(blog.title || "blog").replace(/\s+/g, "_")}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    window.__showToast__ && window.__showToast__("Downloaded", "success");
  };

  if (loading) return <Loading />;

  if (!blog) return <div>Blog not found</div>;

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => nav("/history")}>Back to History</button>
        <button onClick={onCopy}>Copy</button>
        <button onClick={() => onDownload("md")}>Download MD</button>
        <button onClick={() => onDownload("txt")}>Download TXT</button>
        <button onClick={onDelete}>Delete</button>
      </div>

      <h2>{blog.title}</h2>
      <div>
        <small>
          {blog.createdAt} • {blog.wordCount} words • {blog.tone} •{" "}
          {blog.targetAudience}
        </small>
      </div>

      <ReactMarkdown>{blog.content || ""}</ReactMarkdown>
    </div>
  );
}
