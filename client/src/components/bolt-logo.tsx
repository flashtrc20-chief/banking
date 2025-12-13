import React from 'react';

interface BoltLogoProps {
  size?: number;
  className?: string;
}

export const BoltLogo: React.FC<BoltLogoProps> = ({ size = 32, className = "" }) => {
  const scale = size / 200;
  
  return (
    <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          {/* Professional metallic gradient */}
          <linearGradient id="metalGoldPro" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4E6" />
            <stop offset="20%" stopColor="#FFEB3B" />
            <stop offset="40%" stopColor="#FFD700" />
            <stop offset="60%" stopColor="#FFC107" />
            <stop offset="80%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#F57C00" />
          </linearGradient>
          
          {/* Chrome effect for realistic metal look */}
          <linearGradient id="chromeShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="70%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          
          {/* Inner glow for depth */}
          <radialGradient id="centerGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </radialGradient>
          
          {/* Professional drop shadow */}
          <filter id="proShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/>
            <feOffset dx="0" dy="4" result="offsetblur"/>
            <feFlood floodColor="#000000" floodOpacity="0.3"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Circuit pattern for tech feel */}
          <pattern id="techPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.5" fill="#FFD700" opacity="0.3"/>
            <circle cx="35" cy="35" r="1.5" fill="#FFD700" opacity="0.3"/>
            <path d="M5,5 L35,5" stroke="#FFD700" strokeWidth="0.5" opacity="0.2"/>
            <path d="M35,5 L35,35" stroke="#FFD700" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        
        {/* Subtle background circles */}
        <circle cx="100" cy="100" r="95" fill="#1a1a1a" opacity="0.05"/>
        <circle cx="100" cy="100" r="90" fill="#2a2a2a" opacity="0.03"/>
        
        {/* Tech circuit background */}
        <g opacity="0.15">
          <rect x="0" y="0" width="200" height="200" fill="url(#techPattern)"/>
        </g>
        
        {/* Hexagon tech frame centered */}
        <g transform="translate(100,100)">
          {/* Hexagon shadow */}
          <path d="M -50,-29 L -50,29 L 0,58 L 50,29 L 50,-29 L 0,-58 Z"
                fill="#000000"
                opacity="0.2"
                transform="translate(2,4)"/>
          
          {/* Hexagon border */}
          <path d="M -50,-29 L -50,29 L 0,58 L 50,29 L 50,-29 L 0,-58 Z"
                fill="none"
                stroke="url(#metalGoldPro)"
                strokeWidth="2"
                opacity="0.8"/>
          
          {/* Inner glow */}
          <path d="M -50,-29 L -50,29 L 0,58 L 50,29 L 50,-29 L 0,-58 Z"
                fill="url(#centerGlow)"
                opacity="0.1"/>
        </g>
        
        {/* Centered lightning bolt within hexagon */}
        <g filter="url(#proShadow)">
          {/* Main bolt shape perfectly centered */}
          <path d="M 100 70 
                   Q 99 72, 97 75
                   L 85 95
                   Q 84 96, 85 97
                   L 95 97
                   Q 96 97, 95.5 98
                   L 85 125
                   Q 84 128, 87 126
                   L 115 95
                   Q 116 93, 115 92
                   L 105 92
                   Q 104 92, 104.5 91
                   L 113 72
                   Q 114 70, 112 70
                   L 101 70
                   Q 100 70, 100 70 Z"
                fill="url(#chromeShine)"
                stroke="url(#metalGoldPro)"
                strokeWidth="1"
                strokeLinejoin="round"/>
          
          {/* Inner highlight */}
          <path d="M 101 73
                   L 92 88
                   L 98 88
                   L 92 115
                   L 105 92
                   L 99 92
                   L 107 73 Z"
                fill="url(#centerGlow)"
                opacity="0.7"/>
          
          {/* Edge shine */}
          <path d="M 100 70 Q 99 72, 97 75 L 90 85"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.8"
                opacity="0.6"
                strokeLinecap="round"/>
        </g>
        
        {/* Node points at hexagon vertices */}
        <g>
          {/* Top vertex */}
          <circle cx="100" cy="42" r="3" fill="#FFD700">
            <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          {/* Right top vertex */}
          <circle cx="150" cy="71" r="2.5" fill="#FFA500">
            <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" begin="0.33s" repeatCount="indefinite"/>
          </circle>
          {/* Right bottom vertex */}
          <circle cx="150" cy="129" r="2.5" fill="#FFA500">
            <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" begin="0.66s" repeatCount="indefinite"/>
          </circle>
          {/* Bottom vertex */}
          <circle cx="100" cy="158" r="3" fill="#FFD700">
            <animate attributeName="r" values="3;4;3" dur="2s" begin="1s" repeatCount="indefinite"/>
          </circle>
          {/* Left bottom vertex */}
          <circle cx="50" cy="129" r="2.5" fill="#FFA500">
            <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" begin="1.33s" repeatCount="indefinite"/>
          </circle>
          {/* Left top vertex */}
          <circle cx="50" cy="71" r="2.5" fill="#FFA500">
            <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" begin="1.66s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Energy flow paths along hexagon edges */}
        <g opacity="0.6">
          <path d="M100,42 L150,71" stroke="#FFD700" strokeWidth="0.5" fill="none">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="3s" repeatCount="indefinite"/>
          </path>
          <path d="M150,71 L150,129" stroke="#FFA500" strokeWidth="0.5" fill="none">
            <animate attributeName="stroke-dasharray" values="0,100;60,40;0,100" dur="3s" begin="0.5s" repeatCount="indefinite"/>
          </path>
          <path d="M150,129 L100,158" stroke="#FFD700" strokeWidth="0.5" fill="none">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="3s" begin="1s" repeatCount="indefinite"/>
          </path>
          <path d="M100,158 L50,129" stroke="#FFA500" strokeWidth="0.5" fill="none">
            <animate attributeName="stroke-dasharray" values="0,100;60,40;0,100" dur="3s" begin="1.5s" repeatCount="indefinite"/>
          </path>
          <path d="M50,129 L50,71" stroke="#FFD700" strokeWidth="0.5" fill="none">
            <animate attributeName="stroke-dasharray" values="0,100;50,50;0,100" dur="3s" begin="2s" repeatCount="indefinite"/>
          </path>
          <path d="M50,71 L100,42" stroke="#FFA500" strokeWidth="0.5" fill="none">
            <animate attributeName="stroke-dasharray" values="0,100;60,40;0,100" dur="3s" begin="2.5s" repeatCount="indefinite"/>
          </path>
        </g>
      </svg>
    </div>
  );
};

export const BoltTextLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BoltLogo size={40} />
      <div className="flex flex-col">
        <span className="text-2xl font-black bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent tracking-tight">
          BOLT
        </span>
        <span className="text-xs font-semibold text-gray-400 tracking-[0.3em] uppercase -mt-1">
          FLASHER
        </span>
      </div>
    </div>
  );
};