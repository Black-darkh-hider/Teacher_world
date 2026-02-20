import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY is missing. Please set this environment variable.");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateGeminiResponse(prompt) {
  if (!apiKey) {
    throw new Error("Missing Gemini API Key");
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    if (!response?.text) {
      throw new Error("No text response from Gemini API");
    }
    return response.text;
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    throw error;
  }
}
