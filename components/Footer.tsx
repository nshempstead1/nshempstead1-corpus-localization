import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; 2025 Corpus Localization. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-2">Proudly based in New York, NY</p>
      </div>
    </footer>
  );
};

export default Footer;