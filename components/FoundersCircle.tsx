import React from 'react';
import { CheckIcon } from './Icons';

const FoundersCircle: React.FC = () => {
  const benefits = [
    { text: '25% Lifetime Discount', subtext: 'on all services.' },
    { text: 'Priority 24-Hour Turnaround', subtext: 'on all standard certified translations.' },
    { text: 'Direct Founder Access', subtext: 'for all your projects and questions.' },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-500 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Join the Founder's Circle</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
          Be one of our first 5 clients and receive exclusive benefits as a thank you for your early partnership. This is a limited-time offer to help us launch.
        </p>
        <div className="mt-8 bg-white/20 backdrop-blur-sm p-8 rounded-lg inline-block text-left max-w-md mx-auto">
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon />
                <span><strong className="font-semibold">{benefit.text}</strong> {benefit.subtext}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center font-bold text-xl">
            Only <span className="bg-white text-blue-700 px-2 py-1 rounded">3</span> Spots Left!
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersCircle;