type AboutWavesProps = {
  className?: string;
};

export function AboutWaves({ className = "" }: AboutWavesProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1100 280"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden
    >
      <g fill="none" strokeLinecap="round">
        <path d="M420,36 C560,8 700,64 840,36 S1080,8 1220,36" stroke="#1e3a4d" strokeWidth="1.4" opacity="0.22" />
        <path d="M400,62 C550,32 700,92 850,62 S1100,32 1240,62" stroke="#2a516b" strokeWidth="1.6" opacity="0.28" />
        <path d="M380,88 C540,56 700,120 860,88 S1140,56 1260,88" stroke="#3d6f8f" strokeWidth="1.8" opacity="0.32" />
        <path d="M360,114 C530,80 700,148 870,114 S1180,80 1280,114" stroke="#6fa3c2" strokeWidth="2" opacity="0.38" />
        <path d="M340,140 C520,104 700,176 880,140 S1220,104 1300,140" stroke="#8ebdd4" strokeWidth="2.2" opacity="0.42" />
      </g>
      <path fill="#d4eaf6" d="M0,168 C180,138 320,208 500,178 C680,148 820,218 1100,158 L1100,280 L0,280 Z" />
      <path fill="#a8d0e6" d="M0,188 C200,158 360,228 540,198 C740,166 900,228 1100,183 L1100,280 L0,280 Z" />
      <path fill="#6fa3c2" d="M0,208 C220,183 400,243 580,213 C760,183 920,238 1100,203 L1100,280 L0,280 Z" />
      <path fill="#3d6f8f" d="M0,226 C240,208 420,253 620,230 C820,208 960,248 1100,223 L1100,280 L0,280 Z" />
      <path fill="#2a516b" d="M0,246 C260,230 480,266 700,246 C900,226 1000,258 1100,240 L1100,280 L0,280 Z" />
      <path fill="#1e3a4d" d="M0,262 C300,250 520,274 740,258 C940,244 1020,268 1100,258 L1100,280 L0,280 Z" />
    </svg>
  );
}
