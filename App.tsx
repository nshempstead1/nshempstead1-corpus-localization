
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import FoundersCircle from './components/FoundersCircle';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SummarizationModal from './components/SummarizationModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services onDemoClick={() => setIsModalOpen(true)} />
        <HowItWorks />
        <FoundersCircle />
        <Contact />
      </main>
      <Footer />
      <SummarizationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default App;
