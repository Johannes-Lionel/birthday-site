import assert from 'node:assert/strict';
import { FINAL_ENDING, SLIDES } from '../data/slides';

// 1. Verify exactly 16 slides exist
assert.equal(SLIDES.length, 16, 'Storybook must contain exactly 16 slides');

// 2. Verify Slide 1 — Cover
assert.equal(SLIDES[0].title, 'MANJIRI SHAMKULE');
assert.equal(
  SLIDES[0].subtitle,
  'For someone who made ordinary nights feel extraordinary.'
);

// 3. Verify Slide 2 — Midnight Homework Companion
assert.equal(SLIDES[1].title, 'Our little midnight universe');
assert.equal(
  SLIDES[1].message,
  'Some people make the nights feel less lonely. You somehow made even homework feel like something I looked forward to.'
);

// 4. Verify Slide 3 — The All-Night Call
assert.equal(SLIDES[2].title, "A night that didn't need an ending");
assert.equal(
  SLIDES[2].message,
  'I still remember that night when no one was home and we ended up talking all night. Somehow, hours with you never felt like hours.'
);

// 5. Verify Slide 4 — Military School
assert.equal(SLIDES[3].title, 'Distance never really won');
assert.equal(
  SLIDES[3].message,
  "Even when you went away to military school, you'd text me whenever your parents came to meet you. Those little moments meant more than you probably knew."
);
assert.equal(SLIDES[3].hasInteractiveEnvelope, true);

// 6. Verify Slide 5 — Our Moon
assert.equal(SLIDES[4].title, 'The moon knows');
assert.deepEqual(SLIDES[4].lines, [
  'We once made a little agreement.',
  'Whenever we miss each other, we look at the moon.',
  'I still do.',
  'And every time I see it, a little part of me thinks of you.',
]);
assert.equal(SLIDES[4].moonPhase, 1.0);

// 7. Verify Slide 6 — Transition
assert.deepEqual(SLIDES[5].lines, [
  "Enough about the memories we've already made.",
  'Today, I hope life gives you a thousand more reasons to smile.',
  'And if I could wish you anything, it would be these...',
]);
assert.equal(SLIDES[5].hasInteractiveFlower, true);

// 8. Verify Slides 7–16 — The Ten Birthday Wishes (exact verbatim wording)
const expectedWishes = [
  {
    id: 7,
    title: 'A SMILE BEFORE SLEEP',
    message: 'I wish you more days when you fall asleep with a smile.',
  },
  {
    id: 8,
    title: 'DREAMS THAT FIND YOU',
    message: 'May your dreams come true faster than you have time to make them.',
  },
  {
    id: 9,
    title: 'THE PEOPLE WHO GET YOU',
    message: 'I wish you to meet people who understand you with just half a word.',
  },
  {
    id: 10,
    title: 'THE COURAGE TO BEGIN',
    message: 'May you always have the courage to do what you plan.',
  },
  {
    id: 11,
    title: 'BEAUTIFUL LITTLE SURPRISES',
    message: 'I wish you moments that take your breath away.',
  },
  {
    id: 12,
    title: 'TRUST YOURSELF',
    message: 'May your intuition never let you down.',
  },
  {
    id: 13,
    title: 'FALL IN LOVE WITH LIFE',
    message: 'I wish you to fall in love with life again every single day.',
  },
  {
    id: 14,
    title: 'ENERGY FOR WHAT MATTERS',
    message: 'May you always have enough energy for what truly matters.',
  },
  {
    id: 15,
    title: 'PEOPLE WHO DESERVE YOU',
    message: 'I wish you to surround yourself only with people who truly deserve you.',
  },
  {
    id: 16,
    title: 'A YEAR THAT FEELS BEAUTIFUL',
    message:
      'May each new year of your life be better than the last not in numbers, but in how it feels.',
  },
];

for (const expected of expectedWishes) {
  const slide = SLIDES[expected.id - 1];
  assert.equal(slide.id, expected.id);
  assert.equal(slide.title, expected.title);
  assert.equal(slide.message, expected.message);
}

// 9. Verify Final Ending
assert.deepEqual(FINAL_ENDING.sequenceLines, [
  'Remember our little agreement?',
  'Whenever you miss me, look at the moon.',
  "And whenever I do, I'll be looking at it too.",
]);
assert.equal(FINAL_ENDING.greeting, 'Happy Birthday, Manjiri.');
assert.equal(
  FINAL_ENDING.finalMessage,
  'No matter how far life takes us, I hope the moon always reminds you that somewhere, someone is wishing you the very best.'
);
assert.equal(FINAL_ENDING.signature, 'The same moon. Always.');

console.log('All 16 slides and Final Ending content verified successfully!');
