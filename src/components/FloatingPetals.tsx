import React from 'react';

interface FloatingPetalsProps {
  petalColor: string;
  isDark: boolean;
}

const PETAL_SPECS = [
  { left: '8%', top: '14%', size: 12, duration: '15s', delay: '0s', kind: 'petal' },
  { left: '22%', top: '26%', size: 9, duration: '18s', delay: '2.5s', kind: 'star' },
  { left: '78%', top: '12%', size: 13, duration: '16s', delay: '1.2s', kind: 'petal' },
  { left: '89%', top: '34%', size: 10, duration: '19s', delay: '4.0s', kind: 'star' },
  { left: '14%', top: '62%', size: 11, duration: '17s', delay: '3.1s', kind: 'petal' },
  { left: '84%', top: '68%', size: 12, duration: '15.5s', delay: '0.8s', kind: 'petal' },
  { left: '48%', top: '10%', size: 8, duration: '20s', delay: '5.2s', kind: 'star' },
  { left: '66%', top: '76%', size: 9, duration: '17.5s', delay: '2.0s', kind: 'star' },
] as const;

/**
 * Subtle GPU-composited floating pressed petals and starlight motes.
 * Automatically disabled when prefers-reduced-motion: reduce is active.
 */
export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ petalColor, isDark }) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {PETAL_SPECS.map((item, idx) => (
        <div
          key={idx}
          className="absolute animate-petal-float"
          style={
            {
              left: item.left,
              top: item.top,
              '--petal-duration': item.duration,
              '--petal-delay': item.delay,
            } as React.CSSProperties
          }
        >
          {item.kind === 'petal' ? (
            <svg
              width={item.size}
              height={item.size * 1.35}
              viewBox="0 0 16 22"
              fill="none"
            >
              <path
                d="M8 1 C13 5, 15 12, 8 21 C1 12, 3 5, 8 1 Z"
                fill={petalColor}
                fillOpacity={isDark ? 0.24 : 0.34}
              />
            </svg>
          ) : (
            <svg width={item.size} height={item.size} viewBox="0 0 14 14" fill="none">
              <path
                d="M7 0.5 L8.2 5.8 L13.5 7 L8.2 8.2 L7 13.5 L5.8 8.2 L0.5 7 L5.8 5.8 Z"
                fill={petalColor}
                fillOpacity={isDark ? 0.42 : 0.32}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
