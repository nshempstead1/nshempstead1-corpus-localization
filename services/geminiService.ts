
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY environment variable not set. Please ensure it is configured.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const summarizeText = async (text: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API key is not configured. Please contact the site administrator.";
  }
  
  if (!text.trim()) {
    return "Please enter some text to summarize.";
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `Summarize the following text concisely. The text is:\n\n---\n${text}\n---\n\nSummary:`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const summary = response.text;
    
    if (!summary) {
      return "Could not generate a summary. The response was empty.";
    }
    
    return summary;
  } catch (error) {
    console.error("Error summarizing text with Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            return "An error occurred: The API key is not valid. Please check the server configuration.";
        }
        return `An error occurred while generating the summary: ${error.message}`;
    }
    return "An unknown error occurred while generating the summary.";
  }
};
