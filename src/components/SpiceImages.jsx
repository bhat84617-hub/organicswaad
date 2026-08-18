export function HaldiSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="haldi-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
        <radialGradient id="haldi-powder" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#haldi-bg)" />
      <ellipse cx="100" cy="115" rx="55" ry="35" fill="#f59e0b" opacity="0.15" />
      <path d="M60 130 Q80 95 100 80 Q120 95 140 130 Z" fill="#d97706" opacity="0.3" />
      <path d="M70 100 C70 60 85 40 100 40 C115 40 130 60 130 100 C130 105 128 110 125 115 L75 115 C72 110 70 105 70 100Z" fill="#d97706" />
      <path d="M75 100 C75 65 87 48 100 48 C113 48 125 65 125 100 L125 110 C125 108 75 108 75 110Z" fill="#ea580c" opacity="0.4" />
      <ellipse cx="100" cy="40" rx="12" ry="5" fill="#b45309" />
      <circle cx="90" cy="85" r="4" fill="#fbbf24" opacity="0.5" />
      <circle cx="108" cy="92" r="3" fill="#fbbf24" opacity="0.4" />
      <circle cx="95" cy="100" r="2.5" fill="#fbbf24" opacity="0.3" />
      <path d="M60 135 Q100 150 140 135" stroke="#d97706" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M65 140 Q100 155 135 140" stroke="#d97706" strokeWidth="1.5" fill="none" opacity="0.2" />
      <circle cx="100" cy="118" rx="35" ry="12" fill="#92400e" opacity="0.15" />
      <path d="M85 115 L95 118 L105 116 L115 119" stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

export function MirchSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mirch-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef2f2" />
          <stop offset="100%" stopColor="#fecaca" />
        </radialGradient>
        <linearGradient id="mirch-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#mirch-bg)" />
      <ellipse cx="100" cy="145" rx="40" ry="10" fill="#dc2626" opacity="0.1" />
      <path d="M95 35 C93 30 97 25 102 28 L108 35" fill="#16a34a" />
      <path d="M100 35 C100 35 98 40 100 42 C102 40 100 35 100 35Z" fill="#166534" />
      <path d="M80 55 C75 70 72 100 78 130 C82 145 95 160 100 165 C105 160 118 145 122 130 C128 100 125 70 120 55 C115 42 105 38 100 38 C95 38 85 42 80 55Z" fill="url(#mirch-body)" />
      <path d="M85 60 C82 72 80 95 84 120 C87 135 95 150 100 155" fill="none" stroke="#fef2f2" strokeWidth="2" opacity="0.3" />
      <path d="M90 50 Q95 42 100 40" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="38" rx="8" ry="4" fill="#16a34a" />
      <path d="M88 65 C90 80 89 100 90 120" stroke="#b91c1c" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M100 45 C100 60 99 80 100 100" stroke="#fef2f2" strokeWidth="0.8" fill="none" opacity="0.2" />
      <circle cx="95" cy="75" r="1.5" fill="#fef2f2" opacity="0.3" />
      <circle cx="105" cy="85" r="1" fill="#fef2f2" opacity="0.25" />
    </svg>
  );
}

export function DhaniyaSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dhaniya-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </radialGradient>
        <linearGradient id="dhaniya-stem" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#dhaniya-bg)" />
      <ellipse cx="100" cy="150" rx="35" ry="8" fill="#16a34a" opacity="0.1" />
      <path d="M100 160 L100 90" stroke="url(#dhaniya-stem)" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 120 L80 105" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 110 L120 95" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 100 L75 88" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 95 L125 82" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="68" cy="82" rx="20" ry="12" fill="#22c55e" transform="rotate(-25 68 82)" />
      <ellipse cx="68" cy="82" rx="18" ry="10" fill="#4ade80" transform="rotate(-25 68 82)" opacity="0.6" />
      <path d="M58 82 L78 82" stroke="#16a34a" strokeWidth="1" opacity="0.5" />
      <path d="M62 76 L74 88" stroke="#16a34a" strokeWidth="0.8" opacity="0.3" />
      <path d="M62 88 L74 76" stroke="#16a34a" strokeWidth="0.8" opacity="0.3" />
      <ellipse cx="132" cy="88" rx="20" ry="12" fill="#22c55e" transform="rotate(25 132 88)" />
      <ellipse cx="132" cy="88" rx="18" ry="10" fill="#4ade80" transform="rotate(25 132 88)" opacity="0.6" />
      <path d="M122 88 L142 88" stroke="#16a34a" strokeWidth="1" opacity="0.5" />
      <path d="M126 82 L138 94" stroke="#16a34a" strokeWidth="0.8" opacity="0.3" />
      <path d="M126 94 L138 82" stroke="#16a34a" strokeWidth="0.8" opacity="0.3" />
      <ellipse cx="82" cy="68" rx="18" ry="11" fill="#22c55e" transform="rotate(-40 82 68)" />
      <ellipse cx="82" cy="68" rx="16" ry="9" fill="#4ade80" transform="rotate(-40 82 68)" opacity="0.6" />
      <ellipse cx="118" cy="72" rx="18" ry="11" fill="#22c55e" transform="rotate(40 118 72)" />
      <ellipse cx="118" cy="72" rx="16" ry="9" fill="#4ade80" transform="rotate(40 118 72)" opacity="0.6" />
      <ellipse cx="100" cy="58" rx="16" ry="10" fill="#22c55e" transform="rotate(0 100 58)" />
      <ellipse cx="100" cy="58" rx="14" ry="8" fill="#4ade80" transform="rotate(0 100 58)" opacity="0.6" />
      <circle cx="92" cy="100" r="3" fill="#16a34a" opacity="0.2" />
      <circle cx="108" cy="95" r="2.5" fill="#16a34a" opacity="0.15" />
    </svg>
  );
}

export function JeeraSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="jeera-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fefce8" />
          <stop offset="100%" stopColor="#fef9c3" />
        </radialGradient>
        <linearGradient id="jeera-seed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="50%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#jeera-bg)" />
      <ellipse cx="100" cy="145" rx="45" ry="10" fill="#78350f" opacity="0.1" />
      <path d="M88 55 C85 50 88 42 95 40 L98 38" stroke="#65a30d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M100 55 C100 50 103 42 105 40 L108 38" stroke="#65a30d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="95" cy="70" rx="10" ry="22" fill="url(#jeera-seed)" transform="rotate(-10 95 70)" />
      <path d="M90 55 L95 90" stroke="#92400e" strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="105" cy="68" rx="10" ry="22" fill="url(#jeera-seed)" transform="rotate(10 105 68)" />
      <path d="M108 52 L105 88" stroke="#92400e" strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="100" cy="95" rx="9" ry="20" fill="url(#jeera-seed)" transform="rotate(0 100 95)" />
      <path d="M100 80 L100 112" stroke="#92400e" strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="78" cy="90" rx="9" ry="18" fill="url(#jeera-seed)" transform="rotate(-25 78 90)" />
      <ellipse cx="122" cy="88" rx="9" ry="18" fill="url(#jeera-seed)" transform="rotate(25 122 88)" />
      <ellipse cx="72" cy="115" rx="8" ry="16" fill="url(#jeera-seed)" transform="rotate(-35 72 115)" />
      <ellipse cx="128" cy="113" rx="8" ry="16" fill="url(#jeera-seed)" transform="rotate(35 128 113)" />
      <ellipse cx="100" cy="125" rx="8" ry="15" fill="url(#jeera-seed)" transform="rotate(0 100 125)" />
      <ellipse cx="85" cy="130" rx="7" ry="14" fill="url(#jeera-seed)" transform="rotate(-15 85 130)" />
      <ellipse cx="115" cy="128" rx="7" ry="14" fill="url(#jeera-seed)" transform="rotate(15 115 128)" />
      <ellipse cx="95" cy="140" rx="7" ry="12" fill="url(#jeera-seed)" transform="rotate(-5 95 140)" />
      <ellipse cx="105" cy="138" rx="7" ry="12" fill="url(#jeera-seed)" transform="rotate(5 105 138)" />
      <circle cx="88" cy="65" r="1.5" fill="#fbbf24" opacity="0.3" />
      <circle cx="108" cy="62" r="1" fill="#fbbf24" opacity="0.25" />
      <circle cx="98" cy="88" r="1.2" fill="#fbbf24" opacity="0.2" />
    </svg>
  );
}