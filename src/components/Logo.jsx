import React from 'react';

export const Logo = ({ size = 'md', withText = true, className = '', onClick }) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Cyber Shield Icon with neon gradient and circuit core */}
      <div className={`relative ${currentSize.icon} shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#88cc14] to-[#0ea5e9] rounded-lg filter blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_0_8px_rgba(136,204,20,0.6)] transition-transform group-hover:scale-105 duration-200"
        >
          {/* Outer Shield */}
          <path
            d="M24 4L7 11V23C7 33.5 14.3 43.1 24 45.5C33.7 43.1 41 33.5 41 23V11L24 4Z"
            fill="#0d151c"
            stroke="url(#shieldGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner Cyber Circuits */}
          <path
            d="M24 9L11 14.5V23C11 31 16.5 38.5 24 41C31.5 38.5 37 31 37 23V14.5L24 9Z"
            stroke="#88cc14"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.6"
          />

          {/* Circuit Lines */}
          <path d="M16 19H21V23" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 19H27V23" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 13V18" stroke="#88cc14" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 30V36" stroke="#88cc14" strokeWidth="1.5" strokeLinecap="round" />

          {/* Center Hex Core */}
          <polygon
            points="24,20 28.5,22.5 28.5,27.5 24,30 19.5,27.5 19.5,22.5"
            fill="#1a232c"
            stroke="#88cc14"
            strokeWidth="1.5"
          />
          {/* Glowing Center Dot */}
          <circle cx="24" cy="25" r="2.5" fill="#0ea5e9" />
          <circle cx="24" cy="25" r="4.5" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.6" />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="shieldGrad" x1="7" y1="4" x2="41" y2="45.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#88cc14" />
              <stop offset="0.5" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#88cc14" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      {withText && (
        <div className="flex flex-col leading-none">
          <div className={`font-heading font-bold text-white tracking-tight ${currentSize.text} flex items-center`}>
            <span>Kiber</span>
            <span className="text-[#88cc14] ml-0.5 group-hover:text-[#a3e635] transition-colors">Qo'riqchi</span>
          </div>
        </div>
      )}
    </div>
  );
};
