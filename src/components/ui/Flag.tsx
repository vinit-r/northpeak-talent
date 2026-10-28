import type { FlagCode } from '@/content/types';
import { cn } from '@/lib/utils';

/** Points for a regular n-pointed star. */
function star(cx: number, cy: number, outer: number, points = 5, innerRatio = 0.45) {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : outer * innerRatio;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    coords.push(
      `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`,
    );
  }
  return coords.join(' ');
}

function UnionJack() {
  return (
    <>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </>
  );
}

const flags: Record<FlagCode, { viewBox: string; body: JSX.Element }> = {
  us: {
    viewBox: '0 0 38 20',
    body: (
      <>
        <rect width="38" height="20" fill="#fff" />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} y={i * (40 / 13)} width="38" height={20 / 13} fill="#B22234" />
        ))}
        <rect width="15.2" height={(20 / 13) * 7} fill="#3C3B6E" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle
            key={i}
            cx={1.9 + (i % 4) * 3.8}
            cy={1.8 + Math.floor(i / 4) * 3.3}
            r="0.6"
            fill="#fff"
          />
        ))}
      </>
    ),
  },
  gb: { viewBox: '0 0 60 30', body: <UnionJack /> },
  ca: {
    viewBox: '0 0 40 20',
    body: (
      <>
        <rect width="40" height="20" fill="#fff" />
        <rect width="10" height="20" fill="#D52B1E" />
        <rect x="30" width="10" height="20" fill="#D52B1E" />
        <polygon
          fill="#D52B1E"
          points="20,3 21.2,5.5 22.6,4.8 22.2,8 24.4,6.2 25,7.5 27,7 26.4,9.2 27.4,9.8 24,12.6 24.6,14 20.6,13.4 20.6,17 19.4,17 19.4,13.4 15.4,14 16,12.6 12.6,9.8 13.6,9.2 13,7 15,7.5 15.6,6.2 17.8,8 17.4,4.8 18.8,5.5"
        />
      </>
    ),
  },
  au: {
    viewBox: '0 0 60 30',
    body: (
      <>
        <rect width="60" height="30" fill="#012169" />
        <g transform="scale(0.5)">
          <UnionJack />
        </g>
        <polygon points={star(15, 22.5, 4.2, 7)} fill="#fff" />
        <polygon points={star(45, 25, 2.2, 7)} fill="#fff" />
        <polygon points={star(38, 13.5, 2.2, 7)} fill="#fff" />
        <polygon points={star(45, 5, 2.2, 7)} fill="#fff" />
        <polygon points={star(51.5, 11.5, 2.2, 7)} fill="#fff" />
        <polygon points={star(48, 16, 1.2, 5)} fill="#fff" />
      </>
    ),
  },
  ae: {
    viewBox: '0 0 12 6',
    body: (
      <>
        <rect width="12" height="2" fill="#00732F" />
        <rect y="2" width="12" height="2" fill="#fff" />
        <rect y="4" width="12" height="2" fill="#000" />
        <rect width="3" height="6" fill="#FF0000" />
      </>
    ),
  },
  eu: {
    viewBox: '0 0 30 20',
    body: (
      <>
        <rect width="30" height="20" fill="#003399" />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (Math.PI / 6) * i;
          return (
            <polygon
              key={i}
              points={star(15 + 6 * Math.sin(angle), 10 - 6 * Math.cos(angle), 1)}
              fill="#FFCC00"
            />
          );
        })}
      </>
    ),
  },
};

export function Flag({
  code,
  label,
  className,
}: {
  code: FlagCode;
  label: string;
  className?: string;
}) {
  const { viewBox, body } = flags[code];
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className={cn('h-6 w-9 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-border', className)}
    >
      {body}
    </svg>
  );
}
