/**
 * Pure Web Audio API nocturnal music-box / felt-piano engine.
 * Never autoplays; initialized and controlled strictly via user click.
 */

interface NoteEvent {
  freq: number;
  duration: number;
  gain: number;
  delayBeats?: number;
}

// Gentle 3/4 waltz-nocturne in F Major / D Minor (frequencies in Hz)
const NOCTURNE_MEASURES: NoteEvent[][] = [
  // Measure 1: Fmaj7
  [
    { freq: 174.61, duration: 2.6, gain: 0.14 }, // F3
    { freq: 261.63, duration: 1.8, gain: 0.09, delayBeats: 0.5 }, // C4
    { freq: 329.63, duration: 1.8, gain: 0.11, delayBeats: 1.0 }, // E4
    { freq: 440.0, duration: 2.2, gain: 0.12, delayBeats: 1.5 }, // A4
    { freq: 523.25, duration: 2.0, gain: 0.1, delayBeats: 2.0 }, // C5
  ],
  // Measure 2: Dm7
  [
    { freq: 146.83, duration: 2.6, gain: 0.14 }, // D3
    { freq: 220.0, duration: 1.8, gain: 0.09, delayBeats: 0.5 }, // A3
    { freq: 261.63, duration: 1.8, gain: 0.1, delayBeats: 1.0 }, // C4
    { freq: 349.23, duration: 2.2, gain: 0.12, delayBeats: 1.5 }, // F4
    { freq: 440.0, duration: 2.0, gain: 0.11, delayBeats: 2.0 }, // A4
  ],
  // Measure 3: Bbmaj7
  [
    { freq: 116.54, duration: 2.6, gain: 0.14 }, // Bb2
    { freq: 233.08, duration: 1.8, gain: 0.09, delayBeats: 0.5 }, // Bb3
    { freq: 293.66, duration: 1.8, gain: 0.1, delayBeats: 1.0 }, // D4
    { freq: 349.23, duration: 2.2, gain: 0.12, delayBeats: 1.5 }, // F4
    { freq: 440.0, duration: 2.2, gain: 0.11, delayBeats: 2.0 }, // A4
  ],
  // Measure 4: C7sus4 -> C7
  [
    { freq: 130.81, duration: 2.6, gain: 0.14 }, // C3
    { freq: 261.63, duration: 1.8, gain: 0.09, delayBeats: 0.5 }, // C4
    { freq: 349.23, duration: 1.4, gain: 0.1, delayBeats: 1.0 }, // F4
    { freq: 392.0, duration: 2.0, gain: 0.12, delayBeats: 1.5 }, // G4
    { freq: 329.63, duration: 2.2, gain: 0.11, delayBeats: 2.2 }, // E4
  ],
  // Measure 5: Am7
  [
    { freq: 110.0, duration: 2.6, gain: 0.13 }, // A2
    { freq: 220.0, duration: 1.8, gain: 0.09, delayBeats: 0.5 }, // A3
    { freq: 329.63, duration: 1.8, gain: 0.11, delayBeats: 1.0 }, // E4
    { freq: 392.0, duration: 2.2, gain: 0.12, delayBeats: 1.5 }, // G4
    { freq: 523.25, duration: 2.2, gain: 0.11, delayBeats: 2.0 }, // C5
  ],
  // Measure 6: Dm9
  [
    { freq: 146.83, duration: 2.6, gain: 0.14 }, // D3
    { freq: 220.0, duration: 1.8, gain: 0.09, delayBeats: 0.5 }, // A3
    { freq: 329.63, duration: 1.8, gain: 0.11, delayBeats: 1.0 }, // E4
    { freq: 349.23, duration: 2.2, gain: 0.12, delayBeats: 1.5 }, // F4
    { freq: 440.0, duration: 2.0, gain: 0.1, delayBeats: 2.0 }, // A4
  ],
  // Measure 7: Gm7
  [
    { freq: 196.0, duration: 2.5, gain: 0.13 }, // G3
    { freq: 233.08, duration: 1.8, gain: 0.09, delayBeats: 0.5 }, // Bb3
    { freq: 293.66, duration: 1.8, gain: 0.11, delayBeats: 1.0 }, // D4
    { freq: 349.23, duration: 2.2, gain: 0.12, delayBeats: 1.5 }, // F4
    { freq: 392.0, duration: 2.0, gain: 0.11, delayBeats: 2.0 }, // G4
  ],
  // Measure 8: C9 -> F resolve
  [
    { freq: 130.81, duration: 2.8, gain: 0.14 }, // C3
    { freq: 233.08, duration: 1.8, gain: 0.09, delayBeats: 0.5 }, // Bb3
    { freq: 293.66, duration: 1.8, gain: 0.1, delayBeats: 1.0 }, // D4
    { freq: 329.63, duration: 2.4, gain: 0.12, delayBeats: 1.5 }, // E4
    { freq: 349.23, duration: 2.8, gain: 0.12, delayBeats: 2.2 }, // F4
  ],
];

class NocturneMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private timerId: number | null = null;
  private measureIndex = 0;
  private playing = false;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.0001;

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.value = 1400;
      this.filterNode.Q.value = 0.7;

      // Subtle warm delay echo for dreamy nocturnal resonance
      const delay = this.ctx.createDelay(1.0);
      delay.delayTime.value = 0.34;
      const delayGain = this.ctx.createGain();
      delayGain.gain.value = 0.22;

      this.filterNode.connect(this.masterGain);
      this.filterNode.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    return this.ctx;
  }

  private playNote(event: NoteEvent, startTime: number, beatSec: number): void {
    if (!this.ctx || !this.filterNode) return;

    const noteStart = startTime + (event.delayBeats ?? 0) * beatSec;
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    // Warm felt-piano / music-box harmonic blend
    osc.type = 'sine';
    osc.frequency.setValueAtTime(event.freq, noteStart);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(event.freq * 2, noteStart);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.14, noteStart);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.45);

    env.gain.setValueAtTime(0.0001, noteStart);
    env.gain.linearRampToValueAtTime(event.gain, noteStart + 0.035);
    env.gain.exponentialRampToValueAtTime(0.0001, noteStart + event.duration);

    osc.connect(env);
    overtone.connect(overtoneGain);
    overtoneGain.connect(env);
    env.connect(this.filterNode);

    osc.start(noteStart);
    overtone.start(noteStart);
    osc.stop(noteStart + event.duration + 0.05);
    overtone.stop(noteStart + event.duration + 0.05);
  }

  private scheduleMeasure = (): void => {
    if (!this.playing || !this.ctx) return;

    const beatSec = 0.62; // ~96 BPM gentle waltz pulse
    const measureDurationMs = beatSec * 3 * 1000;
    const now = this.ctx.currentTime + 0.04;
    const events = NOCTURNE_MEASURES[this.measureIndex % NOCTURNE_MEASURES.length];

    for (const ev of events) {
      this.playNote(ev, now, beatSec);
    }

    this.measureIndex = (this.measureIndex + 1) % NOCTURNE_MEASURES.length;
    this.timerId = window.setTimeout(this.scheduleMeasure, measureDurationMs);
  };

  public async toggle(): Promise<boolean> {
    if (this.playing) {
      this.stop();
      return false;
    }

    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return false;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    this.playing = true;
    const now = ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.linearRampToValueAtTime(0.65, now + 0.6);

    this.scheduleMeasure();
    return true;
  }

  public stop(): void {
    this.playing = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
    }
  }

  public dispose(): void {
    this.stop();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}

export const musicEngine = new NocturneMusicEngine();
