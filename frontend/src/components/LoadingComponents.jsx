import { Loader2 } from "lucide-react";

const HistoryLoading = () => (
  <div className="min-h-screen bg-[#fffbef] p-6">
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-[#fffbef] rounded-lg p-4 shadow-sm">
          <div className="animate-pulse">
            <div className="h-4 bg-[#e8d9c0] rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-[#e8d9c0] rounded w-full mb-2"></div>
            <div className="h-4 bg-[#e8d9c0] rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BlogLoading = () => (
  <div className="min-h-screen bg-[#fffbef] p-6">
    <div className="space-y-4">
      <div className="animate-pulse">
        <div className="h-4 bg-[#e8d9c0] rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-[#e8d9c0] rounded w-full mb-2"></div>
        <div className="h-4 bg-[#e8d9c0] rounded w-full mb-2"></div>
        <div className="h-4 bg-[#e8d9c0] rounded w-3/4"></div>
      </div>
      <div className="h-px bg-[#e8d9c0] my-4"></div>
      <div className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-4 bg-[#e8d9c0] rounded w-full"></div>
        ))}
      </div>
    </div>
  </div>
);

const GenerateLoading = () => (
  <div className="flex flex-col items-center justify-center bg-[#f9f1e0] pt-10 text-[#5f471d]">
    <Loader2 className="animate-spin text-[#e8d9c0]" size={40} />
    <h2 className="text-lg mt-4">Generating your blog..</h2>
    <p className="text-sm mt-2">This may take a few moments</p>
    <div className="space-y-2 mt-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="h-4 bg-[#e8d9c0] rounded w-3/4"></div>
      ))}
    </div>
  </div>
);

export { HistoryLoading, BlogLoading, GenerateLoading };
