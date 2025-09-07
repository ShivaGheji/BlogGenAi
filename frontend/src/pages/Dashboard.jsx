import React, { useState } from "react";
import BlogForm from "../components/BlogForm";
import { generateBlog } from "../api/blogService";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleGenerate = async (vals) => {
    setLoading(true);
    try {
      const res = await generateBlog(vals);
      // assuming backend returns created blog
      setResult(res.data);
      window.__showToast__ &&
        window.__showToast__("Blog generated successfully", "success");
    } catch (err) {
      window.__showToast__ &&
        window.__showToast__(
          err?.response?.data?.message || "Generation failed",
          "error"
        );
    } finally {
      setLoading(false);
    }
  };

  const copyContent = async () => {
    if (!result?.content) return;
    await navigator.clipboard.writeText(result.content);
    window.__showToast__ &&
      window.__showToast__("Copied to clipboard", "success");
  };

  const downloadAs = (ext = "md") => {
    if (!result?.content) return;
    const blob = new Blob([result.content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const name = (result.title || "blog").replace(/\s+/g, "_");
    a.download = `${name}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    window.__showToast__ && window.__showToast__("Downloaded", "success");
  };

  return (
    <div>
      <h2>Generate Your Blog</h2>
      <BlogForm onGenerate={handleGenerate} isLoading={loading} />
      <div style={{ marginTop: 12 }}>
        <small>
          ~1000 words • Markdown formatted blog will be generated below
        </small>
      </div>

      {loading && <div className=" text-blue-900">Generating...</div>}

      {result && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={copyContent}>Copy</button>
            <button onClick={() => downloadAs("md")}>Download MD</button>
            <button onClick={() => downloadAs("txt")}>Download TXT</button>
            <button onClick={() => nav(`/blogs/${result._id || result.id}`)}>
              View
            </button>
          </div>

          <h3 style={{ marginTop: 12 }}>{result.title}</h3>
          <ReactMarkdown>{result.content || ""}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
