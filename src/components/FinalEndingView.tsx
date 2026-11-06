import React, { useState } from 'react';
import { FINAL_ENDING } from '../data/slides';
import { ArchivalArtPlate } from './BotanicalIllustrations';

interface FinalEndingViewProps {
  direction: 'forward' | 'backward';
  onRestart: () => void;
}

const ENDING_STARS = [
  { left: '9%', top: '14%', size: 2.2, delay: '0.2s', duration: '4.4s' },
  { left: '20%', top: '24%', size: 1.8, delay: '1.4s', duration: '5.1s' },
  { left: '34%', top: '12%', size: 2.5, delay: '0.7s', duration: '3.9s' },
  { left: '68%', top: '14%', size: 2.2, delay: '1.9s', duration: '4.7s' },
  { left: '82%', top: '22%', size: 2.6, delay: '0.5s', duration: '4.2s' },
  { left: '91%', top: '16%', size: 1.8, delay: '2.3s', duration: '5.3s' },
  { left: '14%', top: '78%', size: 2.0, delay: '1.1s', duration: '4.6s' },
  { left: '86%', top: '76%', size: 2.2, delay: '2.0s', duration: '4.0s' },
];

export const FinalEndingView: React.FC<FinalEndingViewProps> = ({
  direction,
  onRestart,
}) => {
  const [revealSeed, setRevealSeed] = useState(0);
  const { palette } = FINAL_ENDING;
  const animClass =
    direction === 'forward' ? 'animate-slide-forward' : 'animate-slide-backward';

  return (
    <div
      key={`ending-${revealSeed}`}
      className={`relative w-full max-w-5xl mx-auto px-6 sm:px-10 py-4 ${animClass}`}
    >
      {/* Subtle nocturnal starfield */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      >
        {ENDING_STARS.map((star, idx) => (
          <span
            key={idx}
            className="absolute rounded-full animate-star-twinkle"
            style={
              {
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: '#EAF1FC',
                '--star-delay': star.delay,
                '--star-duration': star.duration,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">
        {/* Large Glowing Crescent Moon & Floral Lithograph */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full animate-moon-halo pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(216, 227, 242, 0.22) 0%, rgba(216, 227, 242, 0) 70%)',
              }}
            />
            <ArchivalArtPlate
              plate={FINAL_ENDING.artPlate}
              palette={palette}
              moonPhase={FINAL_ENDING.moonPhase}
              sizeClass="w-40 sm:w-52 md:w-60 lg:w-72"
            />
          </div>
        </div>

        {/* Sequential Poetic Reveal & Birthday Dedication */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span
            className="text-xs uppercase tracking-[0.22em] font-body mb-3"
            style={{ color: palette.mutedText }}
          >
            {FINAL_ENDING.kicker}
          </span>

          {/* Sequential poetic lines */}
          <div className="space-y-1.5 sm:space-y-2 max-w-xl">
            {FINAL_ENDING.sequenceLines.map((line, idx) => (
              <p
                key={idx}
                className="font-editorial text-lg sm:text-xl md:text-2xl leading-relaxed animate-line-reveal"
                style={{
                  color: palette.mutedText,
                  animationDelay: `${idx * 650}ms`,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div
            className="w-16 h-px my-4 sm:my-5 animate-line-reveal"
            style={{
              backgroundColor: palette.accent,
              opacity: 0.45,
              animationDelay: '1950ms',
            }}
          />

          {/* Main Birthday Greeting */}
          <h2
            className="font-editorial font-medium text-balance leading-tight animate-line-reveal"
            style={{
              color: palette.text,
              fontSize: 'clamp(2rem, 4.4vw, 3.25rem)',
              animationDelay: '2200ms',
            }}
          >
            {FINAL_ENDING.greeting}
          </h2>

          {/* Final Message */}
          <p
            className="mt-3 font-editorial text-lg sm:text-xl leading-relaxed max-w-xl animate-line-reveal"
            style={{
              color: palette.text,
              opacity: 0.92,
              animationDelay: '2700ms',
            }}
          >
            {FINAL_ENDING.finalMessage}
          </p>

          {/* Final Signature */}
          <p
            className="mt-4 font-editorial italic text-xl sm:text-2xl animate-line-reveal"
            style={{
              color: palette.accent,
              animationDelay: '3200ms',
            }}
          >
            {FINAL_ENDING.signature}
          </p>

          {/* Functional Epilogue Controls */}
          <div
            className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 animate-line-reveal"
            style={{ animationDelay: '3500ms' }}
          >
            <button
              type="button"
              onClick={onRestart}
              className="min-h-[44px] px-5 py-2 text-xs uppercase tracking-[0.2em] font-body font-medium transition-opacity hover:opacity-85 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{
                color: palette.bg,
                backgroundColor: palette.text,
                outlineColor: palette.accent,
              }}
            >
              Read Again
            </button>
            <button
              type="button"
              onClick={() => setRevealSeed((s) => s + 1)}
              className="min-h-[44px] px-4 py-2 text-xs uppercase tracking-[0.18em] font-body transition-opacity hover:opacity-85 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{
                color: palette.mutedText,
                border: `1px solid ${palette.border}`,
                outlineColor: palette.accent,
              }}
            >
              Replay Reveal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
