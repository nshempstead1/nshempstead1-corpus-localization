
import React, { useState, useCallback } from 'react';
import { summarizeText } from '../services/geminiService';

interface SummarizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SummarizationModal: React.FC<SummarizationModalProps> = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = useCallback(async () => {
    setError('');
    setSummary('');
    setIsLoading(true);
    try {
      const result = await summarizeText(inputText);
      if (result.startsWith("Error:")) {
        setError(result);
      } else {
        setSummary(result);
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);
  
  const handleClose = () => {
    setInputText('');
    setSummary('');
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

        <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Content Summarization Demo</h2>
        <p className="text-gray-600 mb-6">Enter any text below to see how our AI can generate a concise summary. This is a live demo using the Google Gemini API.</p>

        <div className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100"
            placeholder="Paste your text here..."
            disabled={isLoading}
          />

          <button
            onClick={handleSummarize}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-gradient-to-r from-blue-800 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Summarizing...
              </>
            ) : (
              'Summarize Text'
            )}
          </button>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {summary && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mt-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Summary:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
            </div>
          )}
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

export default SummarizationModal;
