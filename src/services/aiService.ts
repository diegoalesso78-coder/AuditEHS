import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getEHSRecommendations(stdTitle: string, compliancePct: number, deviations: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", // Using a stable flash model
      contents: `Eres experto HSE. Inspección "${stdTitle}": ${compliancePct}% cumplimiento.\nDesvíos:\n${deviations || "Ninguno"}\nDá 3 recomendaciones cortas y accionables en español.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "No se pudieron generar recomendaciones.";
  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    return "No disponible en este momento.";
  }
}
