/** White stroke icons for benefit arc (24×24 paths, drawn at 0,0). */
type OutcomeIconGlyphProps = {
  index: number;
};

export function OutcomeIconGlyph({ index }: OutcomeIconGlyphProps) {
  const stroke = "#ffffff";
  const sw = 1.65;

  switch (index % 6) {
    case 0:
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17h18M5 17V9l7-4 7 4v8" />
          <path d="M9 13h6" />
        </g>
      );
    case 1:
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </g>
      );
    case 2:
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round">
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M14 20c0-2.2 1.5-3.5 4-3.5" />
        </g>
      );
    case 3:
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18l6-6 4 4 6-8" />
          <path d="M18 8h2v2" />
        </g>
      );
    case 4:
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </g>
      );
    default:
      return (
        <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </g>
      );
  }
}
