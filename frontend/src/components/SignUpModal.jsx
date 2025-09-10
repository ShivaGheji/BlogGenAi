// components/SignUpModal.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../utils/validators";
import { useAuth } from "../context/AuthProvider";

export default function SignUpModal({ isOpen, onClose }) {
  const { registerUser } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [signupError, setSignupError] = useState(null);

  const submit = async (vals) => {
    setSignupError(null);
    try {
      await registerUser(vals);
      window.__showToast__ &&
        window.__showToast__("Signed up successfully", "success");
      onClose();
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        "Authentication failed. Please try again.";
      setSignupError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#fefbf0] p-8 rounded-[0.875rem] shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5f471d] hover:text-[#cb5150]"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-[#5b4824] mb-6 text-center">
          Create your account
        </h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <div>
            <label className="block text-[#5f471d] mb-2">Name</label>
            <input
              {...register("name")}
              className="w-full px-4 py-2 bg-[#e5e0d2] border border-[#e5e0d2] rounded-[0.875rem] focus:border-[#5b4824] focus:outline-none text-[#5f471d]"
              type="text"
            />
            {formState.errors.name && (
              <div className="text-[#cb5150] text-sm mt-1">
                {formState.errors.name.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-[#5f471d] mb-2">Email</label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 bg-[#e5e0d2] border border-[#e5e0d2] rounded-[0.875rem] focus:border-[#5b4824] focus:outline-none text-[#5f471d]"
              type="email"
            />
            {formState.errors.email && (
              <div className="text-[#cb5150] text-sm mt-1">
                {formState.errors.email.message}
              </div>
            )}
          </div>
          <div>
            <label className="block text-[#5f471d] mb-2">Password</label>
            <input
              {...register("password")}
              className="w-full px-4 py-2 bg-[#e5e0d2] border border-[#e5e0d2] rounded-[0.875rem] focus:border-[#5b4824] focus:outline-none text-[#5f471d]"
              type="password"
            />
            {formState.errors.password && (
              <div className="text-[#cb5150] text-sm mt-1">
                {formState.errors.password.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#f7ce86] text-[#5b4824] px-4 py-2 rounded-[0.875rem] hover:bg-[#f9dea9] transition-colors duration-200 font-medium"
          >
            Sign Up
          </button>
          {(formState.errors.name ||
            formState.errors.email ||
            formState.errors.password ||
            signupError) && (
            <div className="text-[#cb5150] text-sm text-center mt-2">
              {signupError ||
                formState.errors.name?.message ||
                formState.errors.email?.message ||
                formState.errors.password?.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
