import React, { useId } from 'react';

interface MoonEmblemProps {
  phase: number; // 0 to 1 (0.2 = crescent, 0.5 = quarter, 1.0 = full)
  accentColor: string;
  isDark: boolean;
  size?: number;
  withBotanicalHalo?: boolean;
  className?: string;
}

/**
 * Renders an engraved vintage celestial moon that subtly transforms its phase,
 * terminator curve, and botanical filigree across the storybook.
 */
export const MoonEmblem: React.FC<MoonEmblemProps> = ({
  phase,
  accentColor,
  isDark,
  size = 32,
  withBotanicalHalo = false,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const clamped = Math.max(0.08, Math.min(1, phase));

  // Calculate SVG terminator path for a circle of radius 34 centered at (50, 50)
  const r = 34;
  const cx = 50;
  const cy = 50;
  const topY = cy - r;
  const botY = cy + r;

  // Map phase [0..1] to terminator ellipse rx
  const cosPhase = Math.cos(clamped * Math.PI);
  const rx = Math.abs(cosPhase) * r;
  const sweepTerminator = cosPhase >= 0 ? 1 : 0;

  const moonPath =
    clamped >= 0.98
      ? `M ${cx} ${topY} A ${r} ${r} 0 1 1 ${cx} ${botY} A ${r} ${r} 0 1 1 ${cx} ${topY} Z`
      : `M ${cx} ${topY} A ${r} ${r} 0 1 1 ${cx} ${botY} A ${rx} ${r} 0 1 ${sweepTerminator} ${cx} ${topY} Z`;

  const fillTone = isDark ? '#EAEFF7' : accentColor;
  const shadowTone = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(60,45,45,0.09)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id={`moonGrad-${uid}`} cx="38%" cy="35%" r="68%">
          <stop offset="0%" stopColor={isDark ? '#FFFFFF' : fillTone} stopOpacity="0.98" />
          <stop offset="65%" stopColor={fillTone} stopOpacity="0.88" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.72" />
        </radialGradient>
      </defs>

      {/* Subtle lunar disc outline */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.32"
        fill={shadowTone}
      />

      {/* Illuminated lunar phase */}
      <path d={moonPath} fill={`url(#moonGrad-${uid})`} />

      {/* Delicate vintage crater engravings when moon is fuller */}
      {clamped > 0.55 && (
        <g stroke={isDark ? '#1A2B45' : '#FFFFFF'} strokeOpacity="0.24" strokeWidth="0.9">
          <circle cx="57" cy="40" r="4.5" />
          <circle cx="63" cy="56" r="6.2" />
          <circle cx="48" cy="61" r="3.4" />
        </g>
      )}

      {/* Botanical wreath & starlight accents for centerpiece / large emblems */}
      {withBotanicalHalo && (
        <g stroke={accentColor} strokeWidth="1.15" strokeLinecap="round" strokeOpacity="0.72">
          {/* Outer celestial ring */}
          <circle cx={cx} cy={cy} r="44" strokeDasharray="2 4" strokeOpacity="0.4" />
          {/* Left botanical leaf sprig */}
          <path d="M 18 72 Q 10 56 15 38" fill="none" />
          <path d="M 15 64 Q 7 60 9 54 Q 15 57 15 64 Z" fill={accentColor} fillOpacity="0.25" />
          <path d="M 14 51 Q 6 47 8 41 Q 14 44 14 51 Z" fill={accentColor} fillOpacity="0.25" />
          {/* Right botanical leaf sprig */}
          <path d="M 82 72 Q 90 56 85 38" fill="none" />
          <path d="M 85 64 Q 93 60 91 54 Q 85 57 85 64 Z" fill={accentColor} fillOpacity="0.25" />
          <path d="M 86 51 Q 94 47 92 41 Q 86 44 86 51 Z" fill={accentColor} fillOpacity="0.25" />
          {/* Four-point star glints */}
          <path d="M 22 22 L 23.5 26.5 L 28 28 L 23.5 29.5 L 22 34 L 20.5 29.5 L 16 28 L 20.5 26.5 Z" fill={accentColor} fillOpacity="0.65" stroke="none" />
          <path d="M 80 20 L 81 23 L 84 24 L 81 25 L 80 28 L 79 25 L 76 24 L 79 23 Z" fill={accentColor} fillOpacity="0.55" stroke="none" />
        </g>
      )}
    </svg>
  );
};
