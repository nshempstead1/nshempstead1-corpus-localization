import React, { useState } from 'react';
import { SuccessIcon } from './Icons';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        const responseData = await response.json();
        if (responseData.errors) {
          setErrorMessage(responseData.errors.map((error: { message: string }) => error.message).join(', '));
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage('Could not connect to the server. Please check your connection.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Ready to Get Started?</h2>
        <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">Send us your document for a free, no-obligation quote. We'll get back to you within the hour.</p>
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {status === 'success' ? (
            <div className="text-center">
              <SuccessIcon />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">Your quote request has been sent successfully. We will be in touch shortly.</p>
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-blue-800 to-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form action="https://formspree.io/f/xqalgkvl" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required disabled={status === 'submitting'} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your Email</label>
                <input type="email" id="email" name="_replyto" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required disabled={status === 'submitting'} />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Project Details</label>
                <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 'I need a 5-page Spanish document translated to English for a USCIS application.'" disabled={status === 'submitting'}></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="file-upload" className="block text-gray-700 font-semibold mb-2">Upload Document (Optional)</label>
                <input type="file" id="file-upload" name="upload" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" disabled={status === 'submitting'} />
              </div>
              <div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-800 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Request'
                  )}
                </button>
              </div>
              {status === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mt-4" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
