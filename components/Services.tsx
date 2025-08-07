import React from 'react';
import ServiceCard from './ServiceCard';
import { CertifiedIcon, InterpretingIcon, VoiceOverIcon, AiIcon } from './Icons';

interface ServicesProps {
  onSummarizeDemoClick: () => void;
  onTranslateDemoClick: () => void;
  onImageDemoClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onSummarizeDemoClick, onTranslateDemoClick, onImageDemoClick }) => {
  const services = [
    {
      icon: <CertifiedIcon />,
      title: 'Certified Translations',
      description: 'ATA-standard translations for USCIS, legal, academic, and corporate use. Guaranteed acceptance.',
    },
    {
      icon: <InterpretingIcon />,
      title: 'Interpreting',
      description: 'Professional remote and in-person interpreting for legal depositions, medical appointments, and conferences.',
    },
    {
      icon: <VoiceOverIcon />,
      title: 'Voice Overs & Dubbing',
      description: 'Studio-quality voice overs and dubbing performed by professional, native-speaking voice artists for your multimedia projects.',
    },
    {
      icon: <AiIcon />,
      title: 'AI Content Services',
      description: 'Leverage our AI tools for content summarization, multilingual chatbots, and internal knowledge base management.',
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">A Full Suite of Language Solutions</h2>
        <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          From certified legal documents to global content strategy, we provide the expert services you need to succeed in any market.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              actionButton={
                service.title === 'AI Content Services' ? (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={onSummarizeDemoClick}
                      className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors w-full"
                    >
                      Try Summarization Demo
                    </button>
                    <button
                      onClick={onTranslateDemoClick}
                      className="bg-teal-100 text-teal-700 font-semibold px-4 py-2 rounded-lg hover:bg-teal-200 transition-colors w-full"
                    >
                      Try Translation Demo
                    </button>
                    <button
                      onClick={onImageDemoClick}
                      className="bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors w-full"
                    >
                      Try Image Generation Demo
                    </button>
                  </div>
                ) : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;