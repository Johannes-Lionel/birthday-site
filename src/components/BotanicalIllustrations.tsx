import React, { useState } from 'react';
import { ART_PLATE_IMAGES } from '../data/artPlates';
import { ArtPlate, BotanicalMotif, SlidePalette } from '../data/slides';
import { MoonEmblem } from './MoonEmblem';

interface ArchivalArtPlateProps {
  plate: ArtPlate;
  palette: SlidePalette;
  moonPhase: number;
  sizeClass?: string;
}

/**
 * Renders a generated vintage botanical/celestial lithograph inside an archival mat
 * with a resilient SVG botanical fallback container (Zero-Broken-Image Policy).
 */
export const ArchivalArtPlate: React.FC<ArchivalArtPlateProps> = ({
  plate,
  palette,
  moonPhase,
  sizeClass = 'w-52 sm:w-64 md:w-72',
}) => {
  const [hasError, setHasError] = useState(false);
  const imageSrc = ART_PLATE_IMAGES[plate.plateKey];

  return (
    <figure className="flex flex-col items-center">
      <div
        className={`relative overflow-hidden p-2 sm:p-2.5 transition-transform duration-500 ${sizeClass} ${
          plate.aspect === '1/1' ? 'aspect-square' : 'aspect-[3/4]'
        }`}
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
          boxShadow: palette.isDark
            ? '0 18px 42px -12px rgba(0, 0, 0, 0.55)'
            : '0 16px 36px -14px rgba(55, 38, 36, 0.16)',
        }}
      >
        {!hasError ? (
          <img
            src={imageSrc}
            alt={plate.alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover block"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
            style={{
              backgroundColor: palette.bg,
              border: `1px solid ${palette.border}`,
            }}
          >
            <MoonEmblem
              phase={moonPhase}
              accentColor={palette.accent}
              isDark={palette.isDark}
              size={96}
              withBotanicalHalo
            />
            <span
              className="mt-3 font-editorial italic text-xs"
              style={{ color: palette.mutedText }}
            >
              {plate.caption}
            </span>
          </div>
        )}
      </div>
      <figcaption
        className="mt-2 font-editorial italic text-xs tracking-wide text-center"
        style={{ color: palette.mutedText }}
      >
        {plate.caption}
      </figcaption>
    </figure>
  );
};

/**
 * Interactive Vintage Wax-Sealed Envelope for Slide 4 (Military School).
 * Opens on tap to reveal a handwritten keepsake note.
 */
export const InteractiveVintageEnvelope: React.FC<{ palette: SlidePalette }> = ({
  palette,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="group relative w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 transition-transform duration-200 active:scale-[0.99] cursor-pointer"
        style={{ outlineColor: palette.accent }}
      >
        {/* Envelope body */}
        <div
          className="relative overflow-hidden px-5 py-5 sm:px-6 sm:py-6 transition-colors duration-300"
          style={{
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: '0 12px 28px -12px rgba(29, 45, 61, 0.16)',
          }}
        >
          {/* Decorative envelope flap lines */}
          <svg
            aria-hidden="true"
            viewBox="0 0 320 76"
            className="w-full h-12 sm:h-14 mb-2 transition-transform duration-500 origin-top"
            style={{
              transform: isOpen ? 'scaleY(-0.65)' : 'scaleY(1)',
            }}
          >
            <path
              d="M 2 2 L 160 66 L 318 2"
              fill="none"
              stroke={palette.accent}
              strokeWidth="1.15"
              strokeOpacity="0.45"
            />
            <path
              d="M 2 74 L 116 32 M 318 74 L 204 32"
              fill="none"
              stroke={palette.accent}
              strokeWidth="0.9"
              strokeOpacity="0.25"
            />
          </svg>

          {/* Pressed forget-me-not sprig & wax seal header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Wax seal emblem */}
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full font-editorial italic text-base transition-transform duration-300 group-hover:scale-105 shrink-0"
                style={{
                  backgroundColor: '#7B2D3B',
                  color: '#FAF3EB',
                  boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.28), 0 3px 8px rgba(70,22,30,0.25)',
                }}
              >
                M
              </span>
              <div>
                <p
                  className="font-editorial text-base sm:text-lg font-medium leading-tight"
                  style={{ color: palette.text }}
                >
                  {isOpen ? 'A folded letter from afar' : 'Sealed Keepsake Letter'}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: palette.mutedText }}
                >
                  {isOpen ? 'Tap to fold envelope' : 'Tap envelope to open'}
                </p>
              </div>
            </div>

            {/* Pressed dusty-blue flower sprig */}
            <svg
              width="38"
              height="38"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M 10 34 Q 18 22 28 10"
                stroke={palette.accent}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="24" cy="14" r="4" fill="#8AA8C4" fillOpacity="0.55" />
              <circle cx="30" cy="18" r="3.5" fill="#8AA8C4" fillOpacity="0.45" />
              <circle cx="20" cy="19" r="3.5" fill="#8AA8C4" fillOpacity="0.5" />
              <circle cx="24" cy="14" r="1.2" fill="#E6C67C" />
            </svg>
          </div>

          {/* Unfolded letter slip */}
          {isOpen && (
            <div
              className="mt-4 pt-4 animate-line-reveal"
              style={{
                borderTop: `1px dashed ${palette.border}`,
              }}
            >
              <p
                className="font-editorial italic text-base sm:text-lg leading-relaxed"
                style={{ color: palette.text }}
              >
                “No matter how busy the days were or how far away you went, hearing from you on visiting days always felt like a quiet reminder that we were still in each other&apos;s corner.”
              </p>
              <p
                className="mt-2 text-xs tracking-wide"
                style={{ color: palette.mutedText }}
              >
                Postmarked · Across the miles
              </p>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

/**
 * Interactive Pressed Flower Specimen for Slide 6 (Transition).
 * Can be tapped to bloom gently and reveal a hidden personal message.
 */
export const InteractivePressedFlower: React.FC<{ palette: SlidePalette }> = ({
  palette,
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <button
        type="button"
        onClick={() => setRevealed((prev) => !prev)}
        aria-expanded={revealed}
        className="group flex flex-col items-center px-6 py-4 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{
          outlineColor: palette.accent,
        }}
      >
        <div
          className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500"
          style={{
            transform: revealed ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          {/* Soft bloom aura when tapped */}
          <div
            aria-hidden="true"
            className="absolute inset-1 rounded-full transition-opacity duration-500"
            style={{
              backgroundColor: palette.petalColor,
              opacity: revealed ? 0.34 : 0.14,
              filter: 'blur(10px)',
            }}
          />

          {/* Detailed pressed blush wild-rose SVG */}
          <svg
            width="96"
            height="96"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
            className="relative z-10"
          >
            {/* Botanical stem & leaves */}
            <path
              d="M 60 66 Q 58 90 52 112"
              stroke="#5D725B"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M 57 86 Q 41 81 38 72 Q 49 72 57 86 Z"
              fill="#7E967B"
              fillOpacity="0.48"
              stroke="#5D725B"
              strokeWidth="1"
            />
            <path
              d="M 56 96 Q 73 91 77 82 Q 65 82 56 96 Z"
              fill="#7E967B"
              fillOpacity="0.48"
              stroke="#5D725B"
              strokeWidth="1"
            />

            {/* Five pressed rose petals */}
            <g
              className="transition-transform duration-500 origin-center"
              style={{
                transform: revealed ? 'rotate(12deg) scale(1.05)' : 'rotate(0deg) scale(1)',
              }}
            >
              <path
                d="M 60 52 C 46 32, 52 14, 60 14 C 68 14, 74 32, 60 52 Z"
                fill="#E3A8B2"
                fillOpacity="0.72"
                stroke={palette.accent}
                strokeWidth="1.1"
              />
              <path
                d="M 60 52 C 76 36, 94 42, 94 50 C 94 58, 76 64, 60 52 Z"
                fill="#DDA0AA"
                fillOpacity="0.68"
                stroke={palette.accent}
                strokeWidth="1.1"
              />
              <path
                d="M 60 52 C 74 68, 70 86, 62 86 C 54 86, 48 68, 60 52 Z"
                fill="#D695A0"
                fillOpacity="0.65"
                stroke={palette.accent}
                strokeWidth="1.1"
              />
              <path
                d="M 60 52 C 44 66, 26 60, 26 52 C 26 44, 44 38, 60 52 Z"
                fill="#DDA0AA"
                fillOpacity="0.68"
                stroke={palette.accent}
                strokeWidth="1.1"
              />
              <path
                d="M 60 52 C 42 40, 34 24, 41 20 C 48 16, 60 32, 60 52 Z"
                fill="#E7B4BC"
                fillOpacity="0.74"
                stroke={palette.accent}
                strokeWidth="1.1"
              />
            </g>

            {/* Golden botanical stamen center */}
            <circle cx="60" cy="51" r="6" fill="#D9AE5F" fillOpacity="0.85" />
            <circle cx="60" cy="51" r="2.5" fill="#8C5A32" fillOpacity="0.65" />
          </svg>
        </div>

        <span
          className="mt-1 text-xs tracking-widest uppercase font-body transition-colors"
          style={{ color: palette.accent }}
        >
          {revealed ? 'Tap blossom to tuck away' : 'Tap the pressed flower'}
        </span>
      </button>

      {revealed && (
        <div
          className="mt-2 w-full px-5 py-4 text-center animate-line-reveal"
          style={{
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
          }}
        >
          <p
            className="font-editorial italic text-base sm:text-lg leading-relaxed"
            style={{ color: palette.text }}
          >
            “P.S. — Some people pass through our lives briefly, and some quietly become a favorite chapter we always carry. Thank you for being one of mine, Manjiri.”
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Custom botanical herbarium & celestial vector specimens for slides
 * without full lithograph plates (Slide 2 and Wishes I–X).
 */
export const SlideBotanicalSpecimen: React.FC<{
  motif: BotanicalMotif;
  palette: SlidePalette;
  moonPhase: number;
}> = ({ motif, palette, moonPhase }) => {
  if (motif === 'homework-stars') {
    return (
      <div className="flex flex-col items-center">
        <svg
          width="170"
          height="150"
          viewBox="0 0 180 160"
          fill="none"
          aria-hidden="true"
          className="w-36 h-32 sm:w-44 sm:h-40"
        >
          {/* Open vintage notebook pages */}
          <path
            d="M 24 116 Q 57 108 90 118 Q 123 108 156 116 L 150 64 Q 120 56 90 66 Q 60 56 30 64 Z"
            fill={palette.surface}
            stroke={palette.accent}
            strokeWidth="1.2"
          />
          <line
            x1="90"
            y1="66"
            x2="90"
            y2="118"
            stroke={palette.accent}
            strokeWidth="1"
            strokeOpacity="0.55"
          />
          {/* Handwritten ink lines inside notebook */}
          <path
            d="M 40 77 Q 58 74 78 78 M 41 87 Q 60 84 77 88 M 42 97 Q 55 95 72 98"
            stroke={palette.mutedText}
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          <path
            d="M 102 78 Q 120 74 139 77 M 103 88 Q 122 85 138 87 M 103 98 Q 118 96 132 98"
            stroke={palette.mutedText}
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          {/* Botanical star-flowers rising from the midnight notebook */}
          <path
            d="M 90 62 Q 86 42 74 28 M 90 62 Q 97 40 112 25"
            stroke={palette.accent}
            strokeWidth="1.15"
            strokeOpacity="0.7"
          />
          {/* Star blossoms */}
          <path
            d="M 74 20 L 76.5 26.5 L 83 29 L 76.5 31.5 L 74 38 L 71.5 31.5 L 65 29 L 71.5 26.5 Z"
            fill={palette.petalColor}
            stroke={palette.accent}
            strokeWidth="1"
          />
          <path
            d="M 112 16 L 114 22 L 120 24 L 114 26 L 112 32 L 110 26 L 104 24 L 110 22 Z"
            fill={palette.petalColor}
            stroke={palette.accent}
            strokeWidth="1"
          />
          <circle cx="52" cy="36" r="2.2" fill={palette.accent} fillOpacity="0.55" />
          <circle cx="132" cy="40" r="2" fill={palette.accent} fillOpacity="0.55" />
        </svg>
      </div>
    );
  }

  // Pressed Herbarium Specimen for the 10 Birthday Wishes
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center w-36 h-44 sm:w-44 sm:h-52 p-4"
        style={{
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
        }}
      >
        {/* Top-right subtle moon phase stamp on herbarium card */}
        <div className="absolute top-2.5 right-2.5">
          <MoonEmblem
            phase={moonPhase}
            accentColor={palette.accent}
            isDark={palette.isDark}
            size={22}
          />
        </div>

        {/* Pressed botanical stem & flower illustration tailored to the wish */}
        <svg
          width="112"
          height="140"
          viewBox="0 0 120 150"
          fill="none"
          aria-hidden="true"
          className="w-24 h-32 sm:w-28 sm:h-36"
        >
          {/* Archival mounting tape strips */}
          <rect
            x="49"
            y="114"
            width="22"
            height="5"
            transform="rotate(-8 60 116)"
            fill={palette.accent}
            fillOpacity="0.18"
          />

          {/* Main pressed botanical stem */}
          <path
            d="M 60 134 Q 57 94 61 48"
            stroke={palette.accent}
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Leaves along stem */}
          <path
            d="M 59 102 Q 40 94 36 82 Q 49 84 59 102 Z"
            fill={palette.petalColor}
            fillOpacity="0.32"
            stroke={palette.accent}
            strokeWidth="1"
          />
          <path
            d="M 59 86 Q 78 78 83 66 Q 70 68 59 86 Z"
            fill={palette.petalColor}
            fillOpacity="0.32"
            stroke={palette.accent}
            strokeWidth="1"
          />

          {/* Distinct blossom geometry by wish motif */}
          {motif === 'wish-lavender' ? (
            <g>
              {[32, 42, 52, 62].map((cy, idx) => (
                <g key={cy}>
                  <ellipse
                    cx={idx % 2 === 0 ? 55 : 65}
                    cy={cy}
                    rx="5"
                    ry="3.2"
                    transform={`rotate(${idx % 2 === 0 ? -25 : 25} ${idx % 2 === 0 ? 55 : 65} ${cy})`}
                    fill={palette.petalColor}
                    fillOpacity="0.72"
                    stroke={palette.accent}
                    strokeWidth="0.9"
                  />
                  <ellipse
                    cx={idx % 2 === 0 ? 64 : 56}
                    cy={cy + 4}
                    rx="4.5"
                    ry="3"
                    transform={`rotate(${idx % 2 === 0 ? 25 : -25} ${idx % 2 === 0 ? 64 : 56} ${cy + 4})`}
                    fill={palette.petalColor}
                    fillOpacity="0.58"
                    stroke={palette.accent}
                    strokeWidth="0.9"
                  />
                </g>
              ))}
            </g>
          ) : motif === 'wish-sage-olive' ? (
            <g>
              {[34, 48, 62].map((y, idx) => (
                <g key={y}>
                  <path
                    d={`M 60 ${y + 10} Q ${40 + idx * 2} ${y} 42 ${y - 10} Q 54 ${y - 4} 60 ${y + 10} Z`}
                    fill={palette.petalColor}
                    fillOpacity="0.55"
                    stroke={palette.accent}
                    strokeWidth="1"
                  />
                  <path
                    d={`M 60 ${y + 6} Q ${80 - idx * 2} ${y - 4} 78 ${y - 14} Q 66 ${y - 8} 60 ${y + 6} Z`}
                    fill={palette.petalColor}
                    fillOpacity="0.45"
                    stroke={palette.accent}
                    strokeWidth="1"
                  />
                </g>
              ))}
            </g>
          ) : (
            <g>
              {/* Multi-petal pressed botanical bloom */}
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <ellipse
                  key={angle}
                  cx="60"
                  cy="34"
                  rx="8.5"
                  ry="16"
                  transform={`rotate(${angle} 60 48)`}
                  fill={palette.petalColor}
                  fillOpacity="0.52"
                  stroke={palette.accent}
                  strokeWidth="1"
                />
              ))}
              <circle
                cx="60"
                cy="48"
                r="6.5"
                fill={palette.accent}
                fillOpacity="0.72"
              />
              <circle cx="60" cy="48" r="2.5" fill={palette.surface} />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
