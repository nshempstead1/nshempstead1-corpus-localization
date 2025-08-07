
import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionButton?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, actionButton }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
      {actionButton && <div className="mt-4">{actionButton}</div>}
    </div>
  );
};

export default ServiceCard;
