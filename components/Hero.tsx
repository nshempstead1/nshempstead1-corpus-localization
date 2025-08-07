import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          The Speed of AI. The Accuracy of a Human Expert.
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          We deliver flawless, ATA-standard certified translations and localization services in any language. Faster and more affordably than traditional agencies.
        </p>
        <div className="mt-10">
          <a href="#contact" className="bg-gradient-to-r from-blue-800 to-blue-500 text-white font-bold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity">
            Become a Founding Client
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;