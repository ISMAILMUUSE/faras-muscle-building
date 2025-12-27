export default function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for depth */}
        <linearGradient id="horseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="maneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7f1d1d" />
          <stop offset="100%" stopColor="#450a0a" />
        </linearGradient>
        {/* Shadow for depth */}
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Horse Body - More realistic proportions */}
      <ellipse 
        cx="110" 
        cy="130" 
        rx="50" 
        ry="35" 
        fill="url(#horseGradient)" 
        filter="url(#shadow)"
      />
      
      {/* Horse Chest/Neck connection */}
      <ellipse 
        cx="75" 
        cy="110" 
        rx="20" 
        ry="25" 
        fill="url(#horseGradient)"
      />
      
      {/* Horse Head - Better proportions */}
      <ellipse 
        cx="50" 
        cy="75" 
        rx="28" 
        ry="32" 
        fill="url(#horseGradient)" 
        filter="url(#shadow)"
      />
      
      {/* Horse Muzzle */}
      <ellipse 
        cx="35" 
        cy="85" 
        rx="12" 
        ry="10" 
        fill="url(#horseGradient)"
      />
      
      {/* Horse Neck - Smooth curve */}
      <path
        d="M 50 100 Q 70 115 90 125 Q 100 130 110 130"
        stroke="url(#horseGradient)"
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Elegant Mane - Flowing */}
      <path
        d="M 30 60 Q 25 50 20 45 Q 15 40 10 50 Q 12 55 15 60 Q 18 65 22 68"
        fill="url(#maneGradient)"
        opacity="0.9"
      />
      <path
        d="M 35 65 Q 30 55 25 50 Q 20 45 15 55 Q 17 60 20 65 Q 23 70 27 73"
        fill="url(#maneGradient)"
        opacity="0.9"
      />
      <path
        d="M 40 70 Q 35 60 30 55 Q 25 50 20 60 Q 22 65 25 70 Q 28 75 32 78"
        fill="url(#maneGradient)"
        opacity="0.9"
      />
      <path
        d="M 45 75 Q 40 65 35 60 Q 30 55 25 65 Q 27 70 30 75 Q 33 80 37 83"
        fill="url(#maneGradient)"
        opacity="0.9"
      />
      
      {/* Horse Ear - Pointed and alert */}
      <path
        d="M 40 50 L 35 40 L 38 45 L 42 50 Z"
        fill="url(#horseGradient)"
      />
      <path
        d="M 40 50 L 35 40 L 38 45 L 42 50 Z"
        fill="#ffffff"
        opacity="0.3"
      />
      
      {/* Horse Eye - Expressive */}
      <circle cx="48" cy="72" r="4" fill="#ffffff" />
      <circle cx="48" cy="72" r="2.5" fill="#1f2937" />
      <circle cx="49" cy="71" r="1" fill="#ffffff" opacity="0.8" />
      
      {/* Horse Nostril */}
      <ellipse cx="32" cy="88" rx="2.5" ry="2" fill="#1f2937" />
      
      {/* Horse Legs - Athletic and strong */}
      {/* Front Left */}
      <rect x="75" y="160" width="10" height="35" fill="url(#horseGradient)" rx="5" />
      {/* Front Right */}
      <rect x="95" y="160" width="10" height="35" fill="url(#horseGradient)" rx="5" />
      {/* Back Left */}
      <rect x="120" y="160" width="10" height="35" fill="url(#horseGradient)" rx="5" />
      {/* Back Right */}
      <rect x="140" y="160" width="10" height="35" fill="url(#horseGradient)" rx="5" />
      
      {/* Hooves - Polished */}
      <ellipse cx="80" cy="198" rx="7" ry="4" fill="#1f2937" />
      <ellipse cx="100" cy="198" rx="7" ry="4" fill="#1f2937" />
      <ellipse cx="125" cy="198" rx="7" ry="4" fill="#1f2937" />
      <ellipse cx="145" cy="198" rx="7" ry="4" fill="#1f2937" />
      
      {/* Flowing Tail - Dynamic */}
      <path
        d="M 160 125 Q 170 110 175 100 Q 180 90 185 95 Q 190 100 188 105 Q 185 110 180 115 Q 175 120 170 125 Q 165 130 160 125"
        fill="url(#maneGradient)"
        opacity="0.9"
      />
      <path
        d="M 155 130 Q 165 115 170 105 Q 175 95 180 100 Q 185 105 183 110 Q 180 115 175 120 Q 170 125 165 130 Q 160 135 155 130"
        fill="url(#maneGradient)"
        opacity="0.7"
      />
      
      {/* Muscle definition on body - Shows strength */}
      <ellipse 
        cx="100" 
        cy="125" 
        rx="8" 
        ry="12" 
        fill="#ffffff" 
        opacity="0.15"
      />
      
      {/* Brand "F" - Subtle and integrated */}
      <text
        x="110"
        y="140"
        fontSize="32"
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        opacity="0.9"
      >
        <tspan x="110" dy="0">F</tspan>
      </text>
      {/* Shadow effect for F */}
      <text
        x="110"
        y="140"
        fontSize="32"
        fontWeight="bold"
        fill="#000000"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        opacity="0.2"
      >
        <tspan x="110.5" dy="0.5">F</tspan>
      </text>
    </svg>
  );
}
