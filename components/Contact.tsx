import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Ready to Get Started?</h2>
        <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">Send us your document for a free, no-obligation quote. We'll get back to you within the hour.</p>
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form action="https://formspree.io/f/YOUR_UNIQUE_ID" method="POST" encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your Email</label>
              <input type="email" id="email" name="_replyto" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Project Details</label>
              <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 'I need a 5-page Spanish document translated to English for a USCIS application.'"></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="file-upload" className="block text-gray-700 font-semibold mb-2">Upload Document (Optional)</label>
              <input type="file" id="file-upload" name="upload" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-800 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">Send Request</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;