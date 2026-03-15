
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAiInstance = () => {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

// Fix: Using gemini-3-pro-preview for diagnostic tasks as it involves complex reasoning
export const diagnoseProblem = async (problemType: string, description: string) => {
  try {
    const ai = getAiInstance();
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `User reports a ${problemType} issue with their car. Description: ${description}. 
                 Provide a short, professional, encouraging 'Smart Diagnosis' for a mobile mechanic dispatch. 
                 Mention potential causes and what the technician will likely check. Keep it under 100 words.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });
    // Use .text property to access generated content.
    return response.text || "Diagnostic data unavailable. A technician will perform a physical inspection on arrival.";
  } catch (error) {
    console.error("Gemini diagnosis failed", error);
    return "Technician will perform live diagnosis upon arrival.";
  }
};
