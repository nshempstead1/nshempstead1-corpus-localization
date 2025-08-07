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
    
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return new Response(JSON.stringify({ error: "Please enter a prompt to generate an image." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    const imageBase64 = response.generatedImages[0]?.image?.imageBytes;
    
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "Could not generate an image. The AI returned an empty response." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ result: imageBase64 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in /api/generate-image handler:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    const statusCode = error instanceof SyntaxError ? 400 : 500;

    return new Response(JSON.stringify({ error: `API Error: ${errorMessage}` }), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}