
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://i.imgur.com/zWWrL3D.jpg" alt="Corpus Localization Logo" className="h-10 mr-3" />
          <span className="text-2xl font-bold text-gray-800">Corpus Localization</span>
        </div>
        <div>
          <a href="#contact" className="bg-gradient-to-r from-blue-800 to-blue-500 text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Request a Quote
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
