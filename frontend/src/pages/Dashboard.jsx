import React, { useState } from "react";
import BlogForm from "../components/BlogForm";
import { generateBlog } from "../api/blogService";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { GenerateLoading } from "../components/LoadingComponents";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleGenerate = async (vals) => {
    setLoading(true);
    try {
      const res = await generateBlog(vals);
      setResult(res.data);
      window.__showToast__ &&
        window.__showToast__("Blog generated successfully", "success");
    } catch (err) {
      window.__showToast__ &&
        window.__showToast__(
          err?.response?.data?.message ||
            "Failed to generate blog, please try again",
          "warning"
        );
    } finally {
      setLoading(false);
    }
  };

  const copyContent = async () => {
    if (!result?.content) return;
    await navigator.clipboard.writeText(result.content);
    window.__showToast__ &&
      window.__showToast__("Blog content copied to clipboard", "success");
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
    window.__showToast__ &&
      window.__showToast__("Blog downloaded successfully", "success");
  };

  return (
    <div
      className="min-h-screen bg-[#fffbef] flex flex-col items-center px-4 py-12 font-sans"
      style={{ fontFamily: "Lora, sans-serif" }}
    >
      <div className="max-w-4xl w-full bg-[#fefbf0] p-6 rounded-[0.875rem] border border-[#e5e0d2] shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-[#5b4824] mb-4 text-center">
          Generate Your Blog
        </h2>
        <p className="text-[#5f471d] mb-6 text-center text-sm md:text-base">
          Enter a prompt and let AI create a comprehensive 1000-word blog post
          for you
        </p>
        <BlogForm onGenerate={handleGenerate} isLoading={loading} />
        <div className="text-[#5f471d] text-sm text-center my-4">
          ~1000 words • Markdown formatted blog will be generated below
        </div>

        {loading && <GenerateLoading />}

        {result && (
          <div className="mt-6">
            <hr className="border-t border-[#e1dace] my-4" />
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              <button
                onClick={copyContent}
                className="bg-[#5b4824] text-[#f9dea9] px-3 py-2 rounded-[0.875rem] hover:bg-[#636e59] transition-colors duration-200 text-sm"
              >
                Copy
              </button>
              <button
                onClick={() => downloadAs("md")}
                className="bg-[#5b4824] text-[#f9dea9] px-3 py-2 rounded-[0.875rem] hover:bg-[#636e59] transition-colors duration-200 text-sm"
              >
                Download MD
              </button>
              <button
                onClick={() => downloadAs("txt")}
                className="bg-[#5b4824] text-[#f9dea9] px-3 py-2 rounded-[0.875rem] hover:bg-[#636e59] transition-colors duration-200 text-sm"
              >
                Download TXT
              </button>
              <button
                onClick={() => nav(`/blogs/${result._id || result.id}`)}
                className="bg-[#e6ecd3] text-[#636e59] px-3 py-2 rounded-[0.875rem] hover:bg-[#f9dea9] transition-colors duration-200 text-sm"
              >
                View
              </button>
            </div>
            <h3 className="text-xl md:text-3xl font-bold text-[#5b4824] mb-4 text-center">
              {result.title}
            </h3>
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
              {result.content || ""}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
