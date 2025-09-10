import React from "react";
import dayjs from "dayjs";
import {
  Calendar,
  FileText,
  Copy,
  Tag,
  Eye,
  Download,
  Trash,
} from "lucide-react";

export default function BlogCard({
  blog,
  onView,
  onDelete,
  onDownload,
  onCopy,
}) {
  return (
    <div className="bg-[#fefbf0] p-4 rounded-[0.875rem] border border-[#e5e0d2] shadow-sm hover:shadow-md hover:shadow-[#decd9e]">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-[#5f471d] text-lg md:text-xl font-semibold mb-2">
              {blog.title || "Untitled"}
            </h3>
            <div className="flex items-center gap-2 text-xs md:text-sm text-[#5f471d] mt-1">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <span>{dayjs(blog.createdAt).format("MMM D, YYYY")}</span>
              <FileText className="w-3 h-3 md:w-4 md:h-4" />
              <span>{blog.wordCount || 0} words</span>
              <Tag className="w-3 h-3 md:w-4 md:h-4" />
              <span>{blog.tone || "—"}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => onView(blog._id || blog.id)}
              className="text-[#a08a65] hover:text-[#5b4824] transition-colors duration-200 inline-flex items-center justify-center gap-1 text-xs md:text-sm font-medium px-2 md:px-3"
            >
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => onCopy(blog)}
              className="text-[#a08a65] hover:text-[#784724] transition-colors duration-200 inline-flex items-center justify-center gap-1 text-xs md:text-sm font-medium px-2 md:px-3"
            >
              <Copy className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => onDownload(blog)}
              className="text-[#a08a65] hover:text-[#5b4824] transition-colors duration-200 inline-flex items-center justify-center gap-1 text-xs md:text-sm font-medium px-2 md:px-3"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => onDelete(blog._id || blog.id)}
              className="text-[#c16884] hover:text-[#e0245e] transition-colors duration-200 inline-flex items-center justify-center gap-1 text-xs md:text-sm font-medium px-2 md:px-3"
            >
              <Trash className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
        <p className="text-[#0f1419] mt-2 line-clamp-2">
          {blog.content
            ? blog.content
                .replace(/^#+.*$/gm, "")
                .replace(/^\s*[-*+].*$/gm, "")
                .replace(/^\s*\d+\..*$/gm, "")
                .replace(/[`*_{}\[\]()#+-]/g, "")
                .replace(/\n+/g, " ")
                .trim()
                .slice(0, 200) + "..."
            : ""}
        </p>
      </div>
    </div>
  );
}
