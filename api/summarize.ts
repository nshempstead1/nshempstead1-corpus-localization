import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  try {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable is not set.");
      return new Response(JSON.stringify({ error: "Server configuration error: The API key is missing." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const { text } = await request.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return new Response(JSON.stringify({ error: "Please enter some text to summarize." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash";
    const prompt = `Summarize the following text concisely. The text is:\n\n---\n${text}\n---\n\nSummary:`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const summary = response.text;
    
    if (!summary) {
      return new Response(JSON.stringify({ error: "Could not generate a summary. The AI returned an empty response." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ result: summary }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in /api/summarize handler:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    const statusCode = error instanceof SyntaxError ? 400 : 500; // Bad JSON vs. other server error

    return new Response(JSON.stringify({ error: `API Error: ${errorMessage}` }), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}