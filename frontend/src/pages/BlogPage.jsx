import React, { useEffect, useState } from "react";
import { getBlog, deleteBlog } from "../api/blogService";
import { useParams, useNavigate } from "react-router-dom";
import { BlogLoading } from "../components/LoadingComponents";
import { BlogNotFound } from "../components/NoBlogComponents";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Copy,
  Download,
  Trash2,
  Calendar,
  FileText,
  Tag,
  Users,
} from "lucide-react";

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
      window.__showToast__ &&
        window.__showToast__("Blog deleted successfully", "success");
      nav("/history");
    } catch (err) {
      window.__showToast__ &&
        window.__showToast__(
          "Failed to delete blog, please try again",
          "warning"
        );
    }
  };

  const onCopy = async () => {
    if (!blog?.content) return;
    await navigator.clipboard.writeText(blog.content);
    window.__showToast__ &&
      window.__showToast__("Blog content copied to clipboard", "success");
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
    window.__showToast__ &&
      window.__showToast__("Blog downloaded successfully", "success");
  };

  if (loading) return <BlogLoading />;

  if (!blog) return <BlogNotFound />;

  return (
    <div
      className="bg-[#fffbef] min-h-screen p-6 font-sans"
      style={{ fontFamily: "Lora, sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => nav("/history")}
            className="text-[#5f471d] flex items-center gap-2 hover:text-[#bc7a00] transition-colors duration-200 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to History
          </button>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={onCopy}
              className="bg-[#f7ce86] text-[#5b4824] px-3 py-2 rounded-[0.875rem] flex items-center gap-1 hover:bg-[#ebba57] transition-colors duration-200 w-full sm:w-auto"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={() => onDownload("md")}
              className="bg-[#5b4824] text-[#f9dea9] px-3 py-2 rounded-[0.875rem] flex items-center gap-1 hover:bg-[#8c6418] transition-colors duration-200 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              Download MD
            </button>
            <button
              onClick={() => onDownload("txt")}
              className="bg-[#5b4824] text-[#f9dea9] px-3 py-2 rounded-[0.875rem] flex items-center gap-1 hover:bg-[#8c6418] transition-colors duration-200 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              Download TXT
            </button>
            <button
              onClick={onDelete}
              className="bg-[#cb5150] text-[#ffffff] px-3 py-2 rounded-[0.875rem] flex items-center gap-1 hover:bg-[#ad1243] transition-colors duration-200 w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="bg-[#fefbf0] p-6 rounded-[0.875rem] shadow-md">
          <h2 className="text-3xl font-bold text-[#5f471d] mb-4">
            {blog.title}
          </h2>
          <div className="text-[#5f471d] text-sm mb-6 flex flex-wrap items-center justify-center space-x-4 md:space-x-6 lg:space-x-8 sm:px-4 md:px-6 lg:px-8">
            <span className="flex items-center mb-2 sm:mb-0">
              <Calendar className="mr-1" size={16} />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center mb-2 sm:mb-0">
              <FileText className="mr-1" size={16} />
              {blog.wordCount} words
            </span>
            <span className="flex items-center mb-2 sm:mb-0">
              <Tag className="mr-1" size={16} />
              {blog.tone}
            </span>
            <span className="flex items-center mb-2 sm:mb-0">
              <Users className="mr-1" size={16} />
              {blog.targetAudience}
            </span>
          </div>
          <hr className="border-t border-[#9b9386] my-4" />
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-4xl font-bold text-[#5f471d] mt-8 mb-4"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-bold text-[#5f471d] mt-6 mb-3"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-lg text-[#0f1419] mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside text-lg text-[#0f1419] mb-4"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="ml-4 mb-2" {...props} />
              ),
            }}
          >
            {blog.content || ""}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
