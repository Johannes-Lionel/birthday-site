import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { FINAL_ENDING, SLIDES } from './data/slides';
import { CornerOrnaments } from './components/CornerOrnaments';
import { FloatingPetals } from './components/FloatingPetals';
import { MoonEmblem } from './components/MoonEmblem';
import { SlideStage } from './components/SlideStage';
import { FinalEndingView } from './components/FinalEndingView';
import { musicEngine } from './utils/musicEngine';

const TOTAL_SLIDES = SLIDES.length; // 16
const ENDING_INDEX = TOTAL_SLIDES; // 16 (after Slide 16)

export function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  const stageScrollRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const isEnding = currentIndex === ENDING_INDEX;
  const activeSlide = !isEnding ? SLIDES[currentIndex] : null;

  const palette = activeSlide ? activeSlide.palette : FINAL_ENDING.palette;
  const moonPhase = activeSlide ? activeSlide.moonPhase : FINAL_ENDING.moonPhase;

  const scrollStageTop = useCallback(() => {
    if (stageScrollRef.current) {
      stageScrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= ENDING_INDEX) return prev;
      setDirection('forward');
      return prev + 1;
    });
    scrollStageTop();
  }, [scrollStageTop]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return prev;
      setDirection('backward');
      return prev - 1;
    });
    scrollStageTop();
  }, [scrollStageTop]);

  const goToIndex = useCallback(
    (targetIdx: number) => {
      if (targetIdx < 0 || targetIdx > ENDING_INDEX || targetIdx === currentIndex) {
        return;
      }
      setDirection(targetIdx > currentIndex ? 'forward' : 'backward');
      setCurrentIndex(targetIdx);
      scrollStageTop();
    },
    [currentIndex, scrollStageTop]
  );

  const handleRestart = useCallback(() => {
    setDirection('backward');
    setCurrentIndex(0);
    scrollStageTop();
  }, [scrollStageTop]);

  const handleToggleMusic = useCallback(async () => {
    const playing = await musicEngine.toggle();
    setIsMusicPlaying(playing);
  }, []);

  // Keyboard navigation (Left/Right/Up/Down arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Clean up Web Audio engine on unmount
  useEffect(() => {
    return () => {
      musicEngine.dispose();
    };
  }, []);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      e.changedTouches.length !== 1
    ) {
      return;
    }

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Require clear horizontal swipe intent so vertical reading never misfires
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  const progressPercent = ((currentIndex + 1) / (TOTAL_SLIDES + 1)) * 100;
  const counterLabel = isEnding
    ? 'Epilogue'
    : `${String(currentIndex + 1).padStart(2, '0')} / ${TOTAL_SLIDES}`;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative h-[100dvh] w-full overflow-hidden flex flex-col justify-between transition-colors duration-700 ease-out select-none ${
        palette.isDark ? 'paper-texture-dark' : 'paper-texture'
      }`}
      style={{
        backgroundColor: palette.bg,
        color: palette.text,
      }}
    >
      {/* Subtle floating botanical petals & starlight */}
      <FloatingPetals petalColor={palette.petalColor} isDark={palette.isDark} />

      {/* Delicate ornamental border & pressed-leaf corners */}
      <CornerOrnaments
        borderColor={palette.border}
        accentColor={palette.accent}
      />

      {/* Compact Top Reading Bar (<= 48px) */}
      <header className="relative z-20 pt-safe px-5 sm:px-9 md:px-12 shrink-0">
        <div className="max-w-6xl mx-auto h-12 flex items-center justify-between gap-4">
          {/* Book Title + Live Lunar Phase Indicator */}
          <button
            type="button"
            onClick={handleRestart}
            title="Return to Cover"
            className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ outlineColor: palette.accent }}
          >
            <MoonEmblem
              phase={moonPhase}
              accentColor={palette.accent}
              isDark={palette.isDark}
              size={18}
              className="shrink-0"
            />
            <span
              className="font-editorial italic text-base sm:text-lg truncate"
              style={{ color: palette.text }}
            >
              Somewhere, Under the Same Moon
            </span>
          </button>

          {/* Right Controls: Music Toggle & Unboxed Slide Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleToggleMusic}
              aria-pressed={isMusicPlaying}
              aria-label={
                isMusicPlaying
                  ? 'Pause background instrumental music'
                  : 'Play background instrumental music'
              }
              className="min-h-[44px] px-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-body whitespace-nowrap shrink-0 transition-opacity hover:opacity-80 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                color: isMusicPlaying ? palette.accent : palette.mutedText,
                outlineColor: palette.accent,
              }}
            >
              {isMusicPlaying ? (
                <Volume2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              )}
              <span>{isMusicPlaying ? 'Music: On' : 'Music: Off'}</span>
            </button>

            <span
              aria-hidden="true"
              className="text-xs select-none"
              style={{ color: palette.border }}
            >
              ·
            </span>

            <span
              aria-live="polite"
              className="text-xs tracking-[0.16em] uppercase font-body tabular-nums whitespace-nowrap shrink-0"
              style={{ color: palette.mutedText }}
            >
              {counterLabel}
            </span>
          </div>
        </div>
      </header>

      {/* Main Full-Screen Story Stage */}
      <main
        ref={stageScrollRef}
        className="relative z-20 flex-1 min-h-0 overflow-y-auto"
      >
        <div className="min-h-full w-full flex items-center justify-center py-3 sm:py-5">
          {activeSlide ? (
            <SlideStage
              slide={activeSlide}
              direction={direction}
              onNext={goNext}
            />
          ) : (
            <FinalEndingView
              direction={direction}
              onRestart={handleRestart}
            />
          )}
        </div>
      </main>

      {/* Compact Bottom Navigation & Subtle Progress Hairline (<= 56px) */}
      <footer className="relative z-20 pb-safe px-5 sm:px-9 md:px-12 shrink-0">
        <div className="max-w-6xl mx-auto">
          {/* Subtle 2px progress track */}
          <div
            className="w-full h-[2px] overflow-hidden"
            style={{ backgroundColor: palette.border }}
            role="progressbar"
            aria-label="Storybook progress"
            aria-valuemin={1}
            aria-valuemax={TOTAL_SLIDES + 1}
            aria-valuenow={currentIndex + 1}
          >
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: palette.accent,
              }}
            />
          </div>

          <nav
            aria-label="Slide navigation"
            className="h-13 flex items-center justify-between gap-4"
          >
            {/* Previous Button */}
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
              className={`min-h-[44px] min-w-[44px] px-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-body whitespace-nowrap shrink-0 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 ${
                currentIndex === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-85 hover:opacity-100 cursor-pointer'
              }`}
              style={{
                color: palette.text,
                outlineColor: palette.accent,
              }}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Previous</span>
            </button>

            {/* Subtle Page Index Dots & Current Moon Phase (Desktop & Tablet) */}
            <div className="hidden md:flex items-center gap-4">
              <div
                className="flex items-center gap-1.5"
                aria-label="Jump to slide"
              >
                {Array.from({ length: TOTAL_SLIDES + 1 }).map((_, idx) => {
                  const isCurrent = idx === currentIndex;
                  const label =
                    idx < TOTAL_SLIDES
                      ? `Go to slide ${idx + 1}`
                      : 'Go to final ending';
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToIndex(idx)}
                      aria-label={label}
                      aria-current={isCurrent ? 'step' : undefined}
                      className="p-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1"
                      style={{ outlineColor: palette.accent }}
                    >
                      <span
                        className="block rounded-full transition-all duration-300"
                        style={{
                          width: isCurrent ? '16px' : '5px',
                          height: '5px',
                          backgroundColor: palette.accent,
                          opacity: isCurrent ? 0.95 : 0.3,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              <span
                aria-hidden="true"
                className="text-xs"
                style={{ color: palette.border }}
              >
                ·
              </span>
              <span
                className="font-editorial italic text-xs tracking-wide whitespace-nowrap"
                style={{ color: palette.mutedText }}
              >
                {activeSlide ? activeSlide.moonLabel : FINAL_ENDING.moonLabel}
              </span>
            </div>

            {/* Mobile quiet swipe hint */}
            <span
              className="md:hidden text-[11px] tracking-[0.14em] uppercase font-body truncate"
              style={{ color: palette.mutedText }}
            >
              {isEnding ? 'The Same Moon' : 'Swipe or tap'}
            </span>

            {/* Next / Cover Button */}
            {!isEnding ? (
              <button
                type="button"
                onClick={goNext}
                aria-label="Next slide"
                className="min-h-[44px] min-w-[44px] px-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-body whitespace-nowrap shrink-0 transition-opacity opacity-90 hover:opacity-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  color: palette.text,
                  outlineColor: palette.accent,
                }}
              >
                <span>{currentIndex === TOTAL_SLIDES - 1 ? 'Ending' : 'Next'}</span>
                <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRestart}
                aria-label="Return to Slide 1 Cover"
                className="min-h-[44px] min-w-[44px] px-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-body whitespace-nowrap shrink-0 transition-opacity opacity-90 hover:opacity-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  color: palette.accent,
                  outlineColor: palette.accent,
                }}
              >
                <span>Cover</span>
              </button>
            )}
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
