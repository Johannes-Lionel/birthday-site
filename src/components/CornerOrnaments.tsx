import React from 'react';

interface CornerOrnamentsProps {
  borderColor: string;
  accentColor: string;
}

/**
 * Delicate 19th-century botanical corner filigree and double-hairline archival frame.
 */
export const CornerOrnaments: React.FC<CornerOrnamentsProps> = ({
  borderColor,
  accentColor,
}) => {
  const CornerSvg = ({ className }: { className: string }) => (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M 2 34 L 2 2 L 34 2"
        stroke={accentColor}
        strokeWidth="1.2"
        strokeOpacity="0.55"
      />
      <path
        d="M 7 24 C 7 13, 13 7, 24 7"
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      {/* Pressed leaf & bud */}
      <path
        d="M 11 11 C 15 11, 18 14, 18 18 C 14 18, 11 15, 11 11 Z"
        fill={accentColor}
        fillOpacity="0.22"
        stroke={accentColor}
        strokeWidth="0.9"
        strokeOpacity="0.6"
      />
      <circle cx="7" cy="7" r="1.8" fill={accentColor} fillOpacity="0.65" />
    </svg>
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-2 sm:inset-4 md:inset-6 z-10"
      style={{
        border: `1px solid ${borderColor}`,
      }}
    >
      {/* Inner hairline border */}
      <div
        className="absolute inset-1.5"
        style={{
          border: `1px solid ${borderColor}`,
          opacity: 0.55,
        }}
      />
      <CornerSvg className="absolute -top-0.5 -left-0.5" />
      <CornerSvg className="absolute -top-0.5 -right-0.5 scale-x-[-1]" />
      <CornerSvg className="absolute -bottom-0.5 -left-0.5 scale-y-[-1]" />
      <CornerSvg className="absolute -bottom-0.5 -right-0.5 scale-[-1]" />
    </div>
  );
};
