import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHistory = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fffbef] text-[#5f471d]">
      <h2 className="text-2xl font-semibold mb-2">404 - Not Found</h2>
      <p className="text-center max-w-md mb-6">
        The page you're looking for doesn't exist or has been removed.
      </p>
      <button
        onClick={handleBackToHistory}
        className="bg-[#e8d9c0] text-[#5f471d] font-medium py-2 px-4 rounded-full hover:bg-[#d9c9b0] transition-colors flex items-center"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
