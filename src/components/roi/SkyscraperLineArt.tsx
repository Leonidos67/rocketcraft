import { TREE_ICON_URL } from '@/data/roiCalculatorAssets';

const ACCENT = '#6b46c1';

interface SkyscraperLineArtProps {
  className?: string;
}

/** Декоративная иллюстрация в стиле референса — фиолетовый line-art. */
const SkyscraperLineArt = ({ className }: SkyscraperLineArtProps) => (
  <svg
    viewBox="0 0 320 260"
    className={className}
    role="img"
    aria-hidden="true"
  >
    <circle cx="48" cy="42" r="28" fill="none" stroke="#e8e8ec" strokeWidth="1.5" />
    <circle cx="268" cy="58" r="36" fill="none" stroke="#ececf0" strokeWidth="1.5" />
    <circle cx="210" cy="198" r="22" fill="none" stroke="#efeff3" strokeWidth="1.5" />

    <g fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* левое здание */}
      <rect x="52" y="118" width="56" height="108" rx="2" />
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <circle
            key={`l-${row}-${col}`}
            cx={66 + col * 14}
            cy={132 + row * 18}
            r="2.2"
            fill={ACCENT}
            stroke="none"
          />
        ))
      )}

      {/* центральное — главное */}
      <rect x="118" y="72" width="84" height="154" rx="2" />
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 11 }, (_, col) => (
          <circle
            key={`c-${row}-${col}`}
            cx={128 + col * 6.8}
            cy={86 + row * 16}
            r="1.8"
            fill={ACCENT}
            stroke="none"
          />
        ))
      )}

      {/* правое здание */}
      <rect x="212" y="98" width="52" height="128" rx="2" />
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <circle
            key={`r-${row}-${col}`}
            cx={224 + col * 14}
            cy={112 + row * 18}
            r="2.2"
            fill={ACCENT}
            stroke="none"
          />
        ))
      )}
    </g>

    <image
      href={TREE_ICON_URL}
      x="248"
      y="198"
      width="28"
      height="36"
      preserveAspectRatio="xMidYMax meet"
    />
  </svg>
);

export default SkyscraperLineArt;
