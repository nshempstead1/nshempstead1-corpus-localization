const handleApiResponse = async (response: Response): Promise<string> => {
    const data = await response.json();
    if (!response.ok) {
        // Use the error from the API response, or a default message
        return `Error: ${data.error || response.statusText}`;
    }
    return data.result;
};

export const summarizeText = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return "Please enter some text to summarize.";
  }

  try {
    const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error("Network or other error calling /api/summarize:", error);
    return "An error occurred: Could not connect to the summarization service.";
  }
};

export const translateText = async (text: string, language: string): Promise<string> => {
  if (!text.trim()) {
    return "Please enter some text to translate.";
  }

  try {
    const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, language }),
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error("Network or other error calling /api/translate:", error);
    return "An error occurred: Could not connect to the translation service.";
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  if (!prompt.trim()) {
    return "Please enter a prompt to generate an image.";
  }

  try {
    const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error("Network or other error calling /api/generate-image:", error);
    return "An error occurred: Could not connect to the image generation service.";
  }
};