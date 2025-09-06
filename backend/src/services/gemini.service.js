import { GoogleGenAI, Type } from "@google/genai";
import {
  GEMINI_API_KEY,
  GEMINI_MODEL,
  GEMINI_MAX_TOKENS,
} from "../utils/env.js";

if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not set in env");

const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateBlogFromPrompt({
  prompt,
  tone,
  targetAudience,
  keywords,
  title,
  maxTokens = Number(GEMINI_MAX_TOKENS) || 3500,
  model = GEMINI_MODEL,
}) {
  const safeKeywords = (keywords || [])
    .slice(0, 20)
    .map((k) => k.trim())
    .filter(Boolean);

  const instruction = `
You are a professional content writer tasked with creating a well-structured blog post in **Markdown** format that is clear, engaging, and easy to understand. The blog should mirror the style of a modern, reader-friendly article with a logical flow, practical insights, and a conversational yet professional tone.

Requirements:
- **Length**: 800-900 words (aim for ~1000 words).
- **Title**: Create a short, engaging title (unless provided) that captures the topic and appeals to the target audience.
- **Structure**:
  - Start with an introductory paragraph (100-150 words) that hooks the reader, introduces the topic, and outlines its relevance to the target audience.
  - Include 4-6 subheadings to organize content logically, covering:
    - Current trends or landscape of the topic.
    - Key applications or benefits (use numbered or bullet lists for clarity).
    - Industry-specific or audience-specific examples (e.g., business, education, healthcare).
    - Challenges and potential solutions (e.g., ethical, practical, or technical issues).
    - Future predictions or actionable insights for the short-term (1-2 years), medium-term (3-5 years), or long-term (5+ years).
  - End with a conclusion (100-150 words) that summarizes key points, emphasizes the topic’s importance, and includes a call-to-action for the reader to engage with the topic.
- **Lists**: Use numbered lists for sequential or prioritized points (e.g., key trends, steps) and bullet lists for non-sequential items (e.g., examples, features). Ensure lists are concise and scannable.
- **Tone**: **${tone} (e.g., conversational) yet professional, engaging the target audience directly (e.g., addressing "you" for individuals or businesses). Avoid overly technical jargon or complex language unless appropriate for the audience. Ensure the tone feels approachable, relatable, and practical, as seen in modern business blogs.**
- **Target Audience**: Tailor content to ${targetAudience}, ensuring relevance with practical examples, benefits, or actionable advice specific to their needs or interests.
- **Keywords**: Integrate the following keywords naturally for SEO and thematic focus: ${
    safeKeywords.join(", ") || "none"
  }.
- **Content Style**:
  - Keep explanations clear, concise, and reader-friendly, avoiding over-complicated concepts.
  - Include practical examples or scenarios relevant to the target audience.
  - Address potential challenges (e.g., ethical, accessibility, or adoption issues) and suggest solutions.
  - Provide actionable insights or recommendations for different audience segments (e.g., businesses, individuals, students) where applicable.
- **Formatting**:
  - Use proper Markdown syntax (e.g., # for main heading, ## for subheadings, - or * for bullets, 1. for numbered lists).
  - Ensure consistent spacing and clear separation between sections.
  - Avoid excessive bolding, italics, or other styling; use emphasis sparingly for key points.
- **Output**: Provide only the blog post in Markdown format. Do not include commentary, metadata, or explanations outside the blog content.

${title ? `Suggested Title: ${title}` : ""}
User prompt:
${prompt}
`.trim();

  const response = await client.models.generateContent({
    model,
    contents: instruction,

    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
          },
          contentMarkdown: {
            type: Type.STRING,
            description:
              "Full blog content in markdown, including headings and summary.",
          },
          summary: {
            type: Type.STRING,
            description: "A short summary (2-3 sentences) of the blog.",
          },
        },
        propertyOrdering: ["title", "contentMarkdown"],
      },
    },

    maxOutputTokens: maxTokens,
  });

  if (!response.text) {
    const error = new Error("No response from Gemini");
    error.statusCode = 502;
    throw error;
  }

  const result = JSON.parse(response.text);

  return result;
}
