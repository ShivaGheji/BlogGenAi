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
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label>Prompt</label>
        <textarea {...register("prompt")} rows={4} />
        {formState.errors.prompt && (
          <div style={{ color: "red" }}>{formState.errors.prompt.message}</div>
        )}
      </div>

      <div>
        <label>Tone</label>
        <select {...register("tone")}>
          <option>Neutral</option>
          <option>Formal</option>
          <option>Casual</option>
          <option>Humorous</option>
          <option>Persuasive</option>
        </select>
        {formState.errors.tone && (
          <div style={{ color: "red" }}>{formState.errors.tone.message}</div>
        )}
      </div>

      <div>
        <label>Target Audience</label>
        <input {...register("targetAudience")} />
        {formState.errors.targetAudience && (
          <div style={{ color: "red" }}>
            {formState.errors.targetAudience.message}
          </div>
        )}
      </div>

      <div>
        <label>Keywords (comma separated)</label>
        <input {...register("keywords")} />
      </div>

      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Blog"}
        </button>
      </div>
    </form>
  );
}
