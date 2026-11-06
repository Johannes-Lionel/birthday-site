import React from 'react';
import { SlideData } from '../data/slides';
import {
  ArchivalArtPlate,
  InteractivePressedFlower,
  InteractiveVintageEnvelope,
  SlideBotanicalSpecimen,
} from './BotanicalIllustrations';
import { MoonEmblem } from './MoonEmblem';

interface SlideStageProps {
  slide: SlideData;
  direction: 'forward' | 'backward';
  onNext: () => void;
}

const STARFIELD_POINTS = [
  { left: '11%', top: '16%', size: 2.5, delay: '0s', duration: '4.1s' },
  { left: '24%', top: '11%', size: 2, delay: '1.1s', duration: '5.0s' },
  { left: '38%', top: '19%', size: 1.8, delay: '2.2s', duration: '3.8s' },
  { left: '64%', top: '13%', size: 2.4, delay: '0.6s', duration: '4.6s' },
  { left: '79%', top: '21%', size: 2, delay: '1.7s', duration: '5.2s' },
  { left: '90%', top: '15%', size: 2.2, delay: '2.8s', duration: '4.3s' },
  { left: '15%', top: '76%', size: 2, delay: '1.4s', duration: '4.8s' },
  { left: '84%', top: '74%', size: 2.5, delay: '0.9s', duration: '3.9s' },
  { left: '72%', top: '84%', size: 1.8, delay: '2.4s', duration: '4.7s' },
  { left: '28%', top: '83%', size: 2.2, delay: '1.9s', duration: '5.1s' },
];

export const SlideStage: React.FC<SlideStageProps> = ({
  slide,
  direction,
  onNext,
}) => {
  const { palette } = slide;
  const animClass =
    direction === 'forward' ? 'animate-slide-forward' : 'animate-slide-backward';

  // SLIDE 1 — COVER
  if (slide.kind === 'cover') {
    return (
      <div
        key={slide.id}
        className={`w-full max-w-5xl mx-auto px-6 sm:px-10 py-4 select-text ${animClass}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">
          {/* Left / Top Editorial Title Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <div className="flex items-center gap-2.5 mb-3">
              <MoonEmblem
                phase={slide.moonPhase}
                accentColor={palette.accent}
                isDark={palette.isDark}
                size={24}
              />
              <span
                className="text-xs uppercase tracking-[0.22em] font-body"
                style={{ color: palette.mutedText }}
              >
                {slide.kicker}
              </span>
            </div>

            <h1
              className="font-editorial font-medium tracking-[0.06em] uppercase text-balance leading-[1.06]"
              style={{
                color: palette.text,
                fontSize: 'clamp(2.2rem, 5vw, 3.85rem)',
              }}
            >
              {slide.title}
            </h1>

            <div
              className="w-16 h-px my-4 sm:my-5"
              style={{ backgroundColor: palette.accent, opacity: 0.45 }}
            />

            <p
              className="font-editorial italic text-xl sm:text-2xl leading-relaxed max-w-md text-balance"
              style={{ color: palette.mutedText }}
            >
              {slide.subtitle}
            </p>

            <div className="mt-6 sm:mt-8">
              <button
                type="button"
                onClick={onNext}
                className="min-h-[46px] px-7 py-2.5 text-xs uppercase tracking-[0.24em] font-body font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 select-none"
                style={{
                  color: palette.text,
                  backgroundColor: 'transparent',
                  border: `1px solid ${palette.accent}`,
                  outlineColor: palette.accent,
                }}
              >
                TAP TO BEGIN
              </button>
            </div>
          </div>

          {/* Right / Top Vintage Floral Moon Lithograph */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            {slide.artPlate && (
              <ArchivalArtPlate
                plate={slide.artPlate}
                palette={palette}
                moonPhase={slide.moonPhase}
                sizeClass="w-44 sm:w-56 md:w-64 lg:w-72"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // SLIDE 5 — OUR MOON (EMOTIONAL CENTERPIECE)
  if (slide.kind === 'centerpiece') {
    return (
      <div
        key={slide.id}
        className={`relative w-full max-w-4xl mx-auto px-6 sm:px-10 py-4 text-center select-text ${animClass}`}
      >
        {/* Subtle twinkling nocturnal starfield */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden z-0"
        >
          {STARFIELD_POINTS.map((star, idx) => (
            <span
              key={idx}
              className="absolute rounded-full animate-star-twinkle"
              style={
                {
                  left: star.left,
                  top: star.top,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: '#E8F0FC',
                  '--star-delay': star.delay,
                  '--star-duration': star.duration,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <p
            className="text-xs uppercase tracking-[0.22em] font-body mb-3"
            style={{ color: palette.mutedText }}
          >
            {slide.kicker}
          </p>

          {/* Large luminous Silver Moon centerpiece */}
          <div className="relative my-1 sm:my-2 flex items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-full animate-moon-halo pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(214, 228, 248, 0.24) 0%, rgba(214, 228, 248, 0) 70%)',
              }}
            />
            {slide.artPlate && (
              <ArchivalArtPlate
                plate={slide.artPlate}
                palette={palette}
                moonPhase={slide.moonPhase}
                sizeClass="w-44 sm:w-56 md:w-64"
              />
            )}
          </div>

          <h2
            className="mt-3 sm:mt-4 font-editorial font-medium text-balance leading-tight"
            style={{
              color: palette.text,
              fontSize: 'clamp(1.85rem, 4vw, 3rem)',
            }}
          >
            {slide.title}
          </h2>

          {/* Line-by-line poetic reveal */}
          <div className="mt-3 sm:mt-4 max-w-xl mx-auto space-y-1.5 sm:space-y-2">
            {slide.lines?.map((line, index) => (
              <p
                key={index}
                className="font-editorial text-lg sm:text-xl md:text-2xl leading-relaxed animate-line-reveal"
                style={{
                  color: index === 2 ? palette.accent : palette.text,
                  fontStyle: index === 2 ? 'italic' : 'normal',
                  animationDelay: `${index * 480}ms`,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SLIDE 6 — TRANSITION + INTERACTIVE PRESSED FLOWER
  if (slide.kind === 'transition') {
    return (
      <div
        key={slide.id}
        className={`w-full max-w-3xl mx-auto px-6 sm:px-10 py-4 text-center select-text ${animClass}`}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2.5 mb-4">
            <MoonEmblem
              phase={slide.moonPhase}
              accentColor={palette.accent}
              isDark={palette.isDark}
              size={24}
            />
            <span
              className="text-xs uppercase tracking-[0.22em] font-body"
              style={{ color: palette.mutedText }}
            >
              {slide.kicker}
            </span>
          </div>

          <div className="max-w-xl mx-auto space-y-3 sm:space-y-4">
            {slide.lines?.map((line, idx) => (
              <p
                key={idx}
                className={`font-editorial leading-relaxed text-balance animate-line-reveal ${
                  idx === 2 ? 'italic text-2xl sm:text-3xl pt-1' : 'text-xl sm:text-2xl'
                }`}
                style={{
                  color: idx === 2 ? palette.accent : palette.text,
                  animationDelay: `${idx * 260}ms`,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div
            className="w-16 h-px my-5 sm:my-6"
            style={{ backgroundColor: palette.accent, opacity: 0.4 }}
          />

          {/* Interactive tappable pressed flower */}
          {slide.hasInteractiveFlower && (
            <InteractivePressedFlower palette={palette} />
          )}
        </div>
      </div>
    );
  }

  // SLIDES 2, 3, 4 — MEMORY CHAPTERS
  if (slide.kind === 'memory') {
    const hasSideVisual = Boolean(slide.artPlate || slide.hasInteractiveEnvelope);

    if (hasSideVisual) {
      return (
        <div
          key={slide.id}
          className={`w-full max-w-5xl mx-auto px-6 sm:px-10 py-4 select-text ${animClass}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">
            {/* Editorial Narrative Column */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-2.5 mb-3">
                <MoonEmblem
                  phase={slide.moonPhase}
                  accentColor={palette.accent}
                  isDark={palette.isDark}
                  size={24}
                />
                <span
                  className="text-xs uppercase tracking-[0.22em] font-body"
                  style={{ color: palette.mutedText }}
                >
                  {slide.kicker}
                </span>
              </div>

              <h2
                className="font-editorial font-medium text-balance leading-tight"
                style={{
                  color: palette.text,
                  fontSize: 'clamp(1.9rem, 4vw, 3.1rem)',
                }}
              >
                {slide.title}
              </h2>

              <div
                className="w-14 h-px my-4"
                style={{ backgroundColor: palette.accent, opacity: 0.45 }}
              />

              <p
                className="font-editorial text-xl sm:text-2xl leading-relaxed max-w-lg"
                style={{ color: palette.text }}
              >
                {slide.message}
              </p>
            </div>

            {/* Visual Plate or Interactive Vintage Envelope Column */}
            <div className="lg:col-span-6 flex justify-center w-full">
              {slide.artPlate && (
                <ArchivalArtPlate
                  plate={slide.artPlate}
                  palette={palette}
                  moonPhase={slide.moonPhase}
                  sizeClass="w-44 sm:w-56 md:w-64 lg:w-72"
                />
              )}
              {slide.hasInteractiveEnvelope && (
                <InteractiveVintageEnvelope palette={palette} />
              )}
            </div>
          </div>
        </div>
      );
    }

    // Slide 2 — Centered botanical star-notebook poster layout
    return (
      <div
        key={slide.id}
        className={`w-full max-w-3xl mx-auto px-6 sm:px-10 py-4 text-center select-text ${animClass}`}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2.5 mb-3">
            <MoonEmblem
              phase={slide.moonPhase}
              accentColor={palette.accent}
              isDark={palette.isDark}
              size={24}
            />
            <span
              className="text-xs uppercase tracking-[0.22em] font-body"
              style={{ color: palette.mutedText }}
            >
              {slide.kicker}
            </span>
          </div>

          <SlideBotanicalSpecimen
            motif={slide.motif}
            palette={palette}
            moonPhase={slide.moonPhase}
          />

          <h2
            className="mt-3 font-editorial font-medium text-balance leading-tight"
            style={{
              color: palette.text,
              fontSize: 'clamp(1.9rem, 4.2vw, 3.1rem)',
            }}
          >
            {slide.title}
          </h2>

          <div
            className="w-14 h-px my-4"
            style={{ backgroundColor: palette.accent, opacity: 0.45 }}
          />

          <p
            className="font-editorial text-xl sm:text-2xl leading-relaxed max-w-xl"
            style={{ color: palette.text }}
          >
            {slide.message}
          </p>
        </div>
      </div>
    );
  }

  // SLIDES 7–16 — THE TEN INDIVIDUAL BIRTHDAY WISHES
  return (
    <div
      key={slide.id}
      className={`w-full max-w-4xl mx-auto px-6 sm:px-10 py-4 select-text ${animClass}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-10">
        {/* Pressed Botanical Specimen Card */}
        <div className="md:col-span-5 flex justify-center">
          <SlideBotanicalSpecimen
            motif={slide.motif}
            palette={palette}
            moonPhase={slide.moonPhase}
          />
        </div>

        {/* Wish Editorial Typography */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
          <span
            className="text-xs uppercase tracking-[0.22em] font-body mb-2.5"
            style={{ color: palette.mutedText }}
          >
            {slide.kicker}
          </span>

          <h2
            className="font-editorial font-medium tracking-[0.06em] uppercase text-balance leading-[1.12]"
            style={{
              color: palette.accent,
              fontSize: 'clamp(1.5rem, 3.2vw, 2.35rem)',
            }}
          >
            {slide.title}
          </h2>

          <div
            className="w-14 h-px my-4"
            style={{ backgroundColor: palette.accent, opacity: 0.45 }}
          />

          <p
            className="font-editorial text-2xl sm:text-3xl leading-relaxed max-w-xl text-balance"
            style={{ color: palette.text }}
          >
            {slide.message}
          </p>
        </div>
      </div>
    </div>
  );
};
