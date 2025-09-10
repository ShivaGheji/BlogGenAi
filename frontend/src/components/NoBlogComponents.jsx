import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoBlogsYet = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fffbef] text-[#5f471d]">
      <div className="bg-[#e8d9c0] rounded-full p-4 mb-6">
        <FileText size={40} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">No blogs yet</h2>
      <p className="text-center max-w-md mb-6">
        You haven't generated any blogs yet. Create your first AI-powered blog
        post to get started.
      </p>
      <button
        onClick={handleBackToDashboard}
        className="bg-[#e8d9c0] text-[#5f471d] font-medium py-2 px-4 rounded-full hover:bg-[#d9c9b0] transition-colors"
      >
        + Generate Your First Blog
      </button>
    </div>
  );
};

const BlogNotFound = () => {
  const navigate = useNavigate();

  const handleBackToHistory = () => {
    navigate("/history");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fffbef] text-[#5f471d]">
      <h2 className="text-2xl font-semibold mb-2">Blog Not Found</h2>
      <p className="text-center max-w-md mb-6">
        The blog you're looking for doesn't exist or has been deleted.
      </p>
      <button
        onClick={handleBackToHistory}
        className="bg-[#e8d9c0] text-[#5f471d] font-medium py-2 px-4 rounded-full hover:bg-[#d9c9b0] transition-colors flex items-center"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to History
      </button>
    </div>
  );
};

export { NoBlogsYet, BlogNotFound };
