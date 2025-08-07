import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Our Hybrid AI-Human Process</h2>
        <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">We combine cutting-edge technology with world-class human expertise to guarantee quality, speed, and value.</p>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-4">
            <div className="bg-gradient-to-r from-blue-800 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white font-bold text-2xl mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered First Draft</h3>
            <p className="text-gray-600">Your document is instantly processed by our advanced AI, creating a highly accurate and formatted translation in minutes.</p>
          </div>
          <div className="p-4">
            <div className="bg-gradient-to-r from-blue-800 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white font-bold text-2xl mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Human Expert Review</h3>
            <p className="text-gray-600">An ATA-certified, native-speaking linguist reviews and refines the draft, ensuring 100% accuracy, nuance, and context.</p>
          </div>
          <div className="p-4">
            <div className="bg-gradient-to-r from-blue-800 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white font-bold text-2xl mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Certified & Delivered</h3>
            <p className="text-gray-600">The final, certified document is delivered to you, often in under 24 hours. Guaranteed to meet all official requirements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;