"use strict";

// geminiClient.js
// This module handles calls to the Google Gemini API using @google/genai package
// Implements async/await with proper error handling and fallback message.

// Import GoogleGenAI from @google/genai for Gemini API calls
const { GoogleGenAI } = require("@google/genai");

// Validate GEMINI_API_KEY presence on module load
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

// Instantiate Gemini client with server-side API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Asynchronously generates a Gemini response for the given user message.
 * Uses "gemini-2.5-flash" model per requirements.
 * Logs any error internally; returns fallback string on failure.
 *
 * @param {string} userMessage User input message for Gemini AI.
 * @returns {Promise<string>} Gemini response text or fallback error message.
 */
async function generateGeminiResponse(userMessage) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [userMessage],
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Something went wrong. Please try again.";
  }
}

module.exports = {
  generateGeminiResponse,
};
