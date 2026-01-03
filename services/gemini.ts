
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const diagnoseProblem = async (problemType: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
