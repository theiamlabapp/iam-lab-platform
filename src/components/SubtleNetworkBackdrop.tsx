export function SubtleNetworkBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <svg
        className="h-full w-full text-slate-400 opacity-[0.16]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="0.9">
          <line x1="60" y1="90" x2="240" y2="165" />
          <line x1="240" y1="165" x2="430" y2="95" />
          <line x1="430" y1="95" x2="640" y2="180" />
          <line x1="640" y1="180" x2="860" y2="110" />
          <line x1="860" y1="110" x2="1080" y2="185" />
          <line x1="120" y1="360" x2="290" y2="290" />
          <line x1="290" y1="290" x2="240" y2="165" />
          <line x1="290" y1="290" x2="495" y2="345" />
          <line x1="495" y1="345" x2="640" y2="180" />
          <line x1="495" y1="345" x2="730" y2="395" />
          <line x1="730" y1="395" x2="860" y2="110" />
          <line x1="730" y1="395" x2="980" y2="340" />
          <line x1="980" y1="340" x2="1080" y2="185" />
          <line x1="180" y1="510" x2="410" y2="475" />
          <line x1="410" y1="475" x2="495" y2="345" />
          <line x1="410" y1="475" x2="730" y2="395" />
          <line x1="730" y1="395" x2="915" y2="515" />
          <line x1="915" y1="515" x2="980" y2="340" />
        </g>
        <g fill="#0B1424">
          <circle cx="60" cy="90" r="3" />
          <circle cx="240" cy="165" r="3.5" />
          <circle cx="430" cy="95" r="3" />
          <circle cx="640" cy="180" r="3.5" fill="#B07424" />
          <circle cx="860" cy="110" r="3" />
          <circle cx="1080" cy="185" r="3" />
          <circle cx="120" cy="360" r="3" />
          <circle cx="290" cy="290" r="3" />
          <circle cx="495" cy="345" r="3.5" />
          <circle cx="730" cy="395" r="3" />
          <circle cx="980" cy="340" r="3.5" fill="#B07424" />
          <circle cx="180" cy="510" r="2.5" />
          <circle cx="410" cy="475" r="3" />
          <circle cx="915" cy="515" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
