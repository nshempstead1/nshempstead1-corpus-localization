import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';

interface ImageGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageGenerationModal: React.FC<ImageGenerationModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    setError('');
    setImageUrl('');
    setIsLoading(true);
    try {
      const result = await generateImage(prompt);
      if (result.startsWith("Error:")) {
        setError(result);
      } else {
        setImageUrl(`data:image/jpeg;base64,${result}`);
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);
  
  const handleClose = () => {
    setPrompt('');
    setImageUrl('');
    setError('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-2xl transform transition-all relative animate-fade-in-up">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Image Generation Demo</h2>
        <p className="text-gray-600 mb-6">Describe an image you'd like to see, and our AI will create it. This is a live demo using the Google Imagen 3 model.</p>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:bg-gray-100 flex-grow"
              placeholder="e.g., A photo of a robot riding a skateboard"
              disabled={isLoading}
              aria-label="Image prompt"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center mt-4 border border-gray-200">
            {isLoading && (
              <div className="text-gray-500">Generating image...</div>
            )}
            {!isLoading && imageUrl && (
                <img src={imageUrl} alt={prompt} className="w-full h-full object-contain rounded-lg" />
            )}
            {!isLoading && !imageUrl && !error && (
                <div className="text-center text-gray-500 p-4">
                    <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p className="mt-2">Your generated image will appear here.</p>
                </div>
            )}
             {!isLoading && !imageUrl && error && (
                <div className="text-center text-red-500 p-4">
                    <p>Could not generate image. Please try again.</p>
                </div>
            )}
          </div>

        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ImageGenerationModal;