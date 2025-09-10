import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import SignInModal from "../components/SignInModal";

export default function Home() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const toggleSignInModal = () => setIsSignInModalOpen(!isSignInModalOpen);

  const handleProtectedClick = (path) => {
    if (!user) {
      setIsSignInModalOpen(true);
    } else {
      nav(path);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fffbef] font-sans"
      style={{ fontFamily: "Lora, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="bg-[#efc57e] py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b4824] mb-4 animate-fade-in">
          Turn Your Ideas into 1000-Word Blogs Instantly
        </h1>
        <p className="text-lg md:text-xl text-[#5f471d] mb-8 max-w-2xl mx-auto animate-fade-in-delayed">
          Enter a simple prompt, choose your tone and audience, and let AI craft
          a fully formatted, professional blog in seconds.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => handleProtectedClick("/dashboard")}
            className="bg-[#353127] text-[#f9dea9] px-6 py-3 mb-4 sm:mb-0 mx-4 rounded-[0.875rem] text-lg font-medium hover:bg-[#5f471d] transition-colors duration-200 animate-fade-in-delayed"
          >
            🚀 Get Started
          </button>
          <button
            onClick={() => handleProtectedClick("/history")}
            className="bg-[#e6ecd3] text-[#636e59] px-6 py-3 rounded-[0.875rem] text-lg font-medium hover:bg-[#f9dea9] transition-colors duration-200 animate-fade-in-delayed"
          >
            📖 View History
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5b4824] text-center mb-12 animate-fade-in">
          Why Use Our Blog Generator?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#fefbf0] p-6 rounded-[0.875rem] shadow-md text-[#0f1419] hover:bg-[#f7eede] transition-colors duration-200 animate-fade-in-delayed">
            <span className="text-2xl mb-4">✨</span>
            <h3 className="text-xl font-medium mb-2">AI-Powered Writing</h3>
            <p className="text-sm">
              Generate long-form blogs from just a short prompt.
            </p>
          </div>
          <div className="bg-[#fefbf0] p-6 rounded-[0.875rem] shadow-md text-[#0f1419] hover:bg-[#f7eede] transition-colors duration-200 animate-fade-in-delayed">
            <span className="text-2xl mb-4">📝</span>
            <h3 className="text-xl font-medium mb-2">Customizable</h3>
            <p className="text-sm">
              Set the tone, audience, and keywords to guide the blog style.
            </p>
          </div>
          <div className="bg-[#fefbf0] p-6 rounded-[0.875rem] shadow-md text-[#0f1419] hover:bg-[#f7eede] transition-colors duration-200 animate-fade-in-delayed">
            <span className="text-2xl mb-4">📂</span>
            <h3 className="text-xl font-medium mb-2">Save & Revisit</h3>
            <p className="text-sm">
              Access all your past blogs anytime in History.
            </p>
          </div>
          <div className="bg-[#fefbf0] p-6 rounded-[0.875rem] shadow-md text-[#0f1419] hover:bg-[#f7eede] transition-colors duration-200 animate-fade-in-delayed">
            <span className="text-2xl mb-4">📤</span>
            <h3 className="text-xl font-medium mb-2">Export Easily</h3>
            <p className="text-sm">
              Copy, download, or share your blogs in one click.
            </p>
          </div>
          <div className="bg-[#fefbf0] p-6 rounded-[0.875rem] shadow-md text-[#0f1419] hover:bg-[#f7eede] transition-colors duration-200 animate-fade-in-delayed">
            <span className="text-2xl mb-4">🔐</span>
            <h3 className="text-xl font-medium mb-2">Secure & Private</h3>
            <p className="text-sm">
              Your content is stored safely with your account.
            </p>
          </div>
        </div>
      </section>

      <SignInModal isOpen={isSignInModalOpen} onClose={toggleSignInModal} />
    </div>
  );
}
