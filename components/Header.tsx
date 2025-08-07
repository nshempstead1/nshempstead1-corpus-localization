import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3" aria-label="Corpus Localization homepage">
          <Logo />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-blue-800">Corpus</span>
            <span className="text-gray-800"> Localization</span>
          </span>
        </a>
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
