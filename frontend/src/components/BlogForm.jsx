import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../utils/validators";

export default function BlogForm({ onGenerate, isLoading }) {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      prompt: "",
      tone: "Neutral",
      targetAudience: "",
      keywords: "",
    },
  });

  const submit = (vals) => onGenerate(vals);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-4 font-sans"
      style={{ fontFamily: "Lora, sans-serif" }}
    >
      <div>
        <label className="block text-[#5f471d] text-sm font-medium mb-1">
          Blog Prompt
        </label>
        <textarea
          {...register("prompt")}
          rows={4}
          className="w-full resize-none bg-[#fffbef] text-[#5f471d] p-2 rounded-[0.875rem] border border-[#e5e0d2] focus:outline-none focus:border-[#5b4824]"
          placeholder="Write about the impact of AI in healthcare, future of renewable energy, or any topic you'd like to explore..."
        />
        <span className="text-xs text-[#5f471d] block">
          Be specific for better results
        </span>
        {formState.errors.prompt && (
          <div className="text-[#cb5150] text-sm mt-1">
            {formState.errors.prompt.message}
          </div>
        )}
      </div>

      <div>
        <label className="block text-[#5f471d] text-sm font-medium mb-1">
          Tone
        </label>
        <select
          {...register("tone")}
          className="w-full bg-[#fffbef] text-[#5f471d] p-2 rounded-[0.875rem] border border-[#e5e0d2] focus:outline-none focus:border-[#5b4824] appearance-none"
        >
          <option>Neutral</option>
          <option>Formal</option>
          <option>Casual</option>
          <option>Humorous</option>
          <option>Persuasive</option>
        </select>
        {formState.errors.tone && (
          <div className="text-[#cb5150] text-sm mt-1">
            {formState.errors.tone.message}
          </div>
        )}
      </div>

      <div>
        <label className="block text-[#5f471d] text-sm font-medium mb-1">
          Target Audience
        </label>
        <input
          {...register("targetAudience")}
          className="w-full bg-[#fffbef] text-[#5f471d] p-2 rounded-[0.875rem] border border-[#e5e0d2] focus:outline-none focus:border-[#80632c]"
          placeholder="e.g., developers, students"
        />
        {formState.errors.targetAudience && (
          <div className="text-[#cb5150] text-sm mt-1">
            {formState.errors.targetAudience.message}
          </div>
        )}
      </div>

      <div>
        <label className="block text-[#5f471d] text-sm font-medium mb-1">
          Keywords
        </label>
        <input
          {...register("keywords")}
          className="w-full bg-[#fffbef] text-[#5f471d] p-2 rounded-[0.875rem] border border-[#e5e0d2] focus:outline-none focus:border-[#5b4824]"
          placeholder="e.g., AI, technology, innovation"
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#f7ce86] text-[#5b4824] p-2 rounded-[0.875rem] font-medium hover:bg-[#f9dea9] transition-colors duration-200 disabled:bg-[#e6ecd3] disabled:text-[#636e59] disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating..." : "Generate Blog"}
        </button>
      </div>
    </form>
  );
}
