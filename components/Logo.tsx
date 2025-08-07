import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg 
      aria-hidden="true"
      viewBox="-6 0 98 55" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-9 w-auto"
    >
      <defs>
        <linearGradient id="logo-l-gradient" x1="47.5661" y1="0.5" x2="79.4982" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F9DED"/>
          <stop offset="1" stopColor="#1E5CBE"/>
        </linearGradient>
      </defs>
      <path d="M41.3411 19.52C35.8411 14.02 28.5161 10.5 20.5661 10.5C9.56613 10.5 0.566132 19.5 0.566132 30.5C0.566132 41.5 9.56613 50.5 20.5661 50.5C28.5161 50.5 35.8411 47.02 41.3411 41.52" stroke="#0D1A3A" strokeWidth="12" strokeLinecap="round"/>
      <path d="M47.5661 0.5L67.5661 0.5L67.5661 41.016L54.5661 54L54.5661 13.5L47.5661 13.5V0.5Z" fill="url(#logo-l-gradient)"/>
      <path d="M67.5661 41.0161L91.5661 41.0161L78.5661 54.0001L54.5661 54.0001L67.5661 41.0161Z" fill="url(#logo-l-gradient)"/>
    </svg>
  );
};

export default Logo;
