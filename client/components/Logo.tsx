export default function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horse Body */}
      <ellipse cx="100" cy="120" rx="45" ry="30" fill="#dc2626" />
      
      {/* Horse Head */}
      <ellipse cx="60" cy="80" rx="25" ry="30" fill="#dc2626" />
      
      {/* Horse Neck */}
      <path
        d="M 60 100 Q 80 110 100 120"
        stroke="#dc2626"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Horse Mane */}
      <path
        d="M 45 70 Q 50 60 55 65 Q 50 70 45 80"
        fill="#991b1b"
      />
      <path
        d="M 50 75 Q 55 65 60 70 Q 55 75 50 85"
        fill="#991b1b"
      />
      
      {/* Horse Ear */}
      <path
        d="M 45 60 L 50 50 L 48 60 Z"
        fill="#dc2626"
      />
      
      {/* Horse Eye */}
      <circle cx="55" cy="75" r="3" fill="#ffffff" />
      <circle cx="55" cy="75" r="1.5" fill="#000000" />
      
      {/* Horse Nostril */}
      <ellipse cx="50" cy="85" rx="2" ry="1.5" fill="#000000" />
      
      {/* Horse Legs */}
      <rect x="85" y="140" width="8" height="30" fill="#dc2626" />
      <rect x="105" y="140" width="8" height="30" fill="#dc2626" />
      <rect x="70" y="145" width="8" height="25" fill="#dc2626" />
      <rect x="120" y="145" width="8" height="25" fill="#dc2626" />
      
      {/* Horse Hooves */}
      <ellipse cx="89" cy="172" rx="6" ry="3" fill="#000000" />
      <ellipse cx="109" cy="172" rx="6" ry="3" fill="#000000" />
      <ellipse cx="74" cy="172" rx="6" ry="3" fill="#000000" />
      <ellipse cx="124" cy="172" rx="6" ry="3" fill="#000000" />
      
      {/* Horse Tail */}
      <path
        d="M 145 120 Q 160 100 170 90 Q 175 85 180 95 Q 170 105 160 115 Q 150 125 145 120"
        fill="#991b1b"
      />
      
      {/* Brand Initial "F" overlay */}
      <text
        x="100"
        y="130"
        fontSize="40"
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        F
      </text>
    </svg>
  );
}

