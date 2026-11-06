export type SlideKind = 'cover' | 'memory' | 'centerpiece' | 'transition' | 'wish';

export type ArtPlateKey =
  | 'cover-floral-moon'
  | 'vintage-telephone'
  | 'full-silver-moon'
  | 'ending-crescent-moon';

export type BotanicalMotif =
  | 'cover-moon'
  | 'homework-stars'
  | 'telephone-dahlia'
  | 'military-letter'
  | 'silver-moon'
  | 'transition-rose'
  | 'wish-blush-rose'
  | 'wish-lavender'
  | 'wish-powder-blue'
  | 'wish-burgundy-dahlia'
  | 'wish-peach-blossom'
  | 'wish-sage-olive'
  | 'wish-buttercup'
  | 'wish-dusty-peony'
  | 'wish-plum-hellebore'
  | 'wish-midnight-jasmine';

export interface SlidePalette {
  bg: string;
  surface: string;
  text: string;
  mutedText: string;
  accent: string;
  border: string;
  petalColor: string;
  isDark: boolean;
}

export interface ArtPlate {
  plateKey: ArtPlateKey;
  alt: string;
  caption: string;
  aspect: '3/4' | '1/1';
}

export interface SlideData {
  id: number;
  kind: SlideKind;
  kicker: string;
  title?: string;
  subtitle?: string;
  message?: string;
  lines?: string[];
  palette: SlidePalette;
  motif: BotanicalMotif;
  moonPhase: number; // 0 = new, 0.25 = crescent, 0.5 = quarter, 1.0 = full
  moonLabel: string;
  artPlate?: ArtPlate;
  hasInteractiveEnvelope?: boolean;
  hasInteractiveFlower?: boolean;
}

export const SLIDES: SlideData[] = [
  {
    id: 1,
    kind: 'cover',
    kicker: 'Somewhere, Under the Same Moon',
    title: 'MANJIRI SHAMKULE',
    subtitle: 'For someone who made ordinary nights feel extraordinary.',
    palette: {
      bg: '#F7F1E6',
      surface: '#EFE6D5',
      text: '#231D1E',
      mutedText: '#665758',
      accent: '#9A4D5A',
      border: 'rgba(110, 84, 78, 0.24)',
      petalColor: '#D69FA6',
      isDark: false,
    },
    motif: 'cover-moon',
    moonPhase: 0.22,
    moonLabel: 'Waxing Crescent',
    artPlate: {
      plateKey: 'cover-floral-moon',
      alt: 'Vintage botanical lithograph of a crescent moon entwined with dusty pink wild roses and jasmine blossoms',
      caption: 'Plate I · Nocturne in Crescent & Wild Rose',
      aspect: '3/4',
    },
  },
  {
    id: 2,
    kind: 'memory',
    kicker: 'Chapter I · Midnight Pages',
    title: 'Our little midnight universe',
    message:
      'Some people make the nights feel less lonely. You somehow made even homework feel like something I looked forward to.',
    palette: {
      bg: '#F6E6E8',
      surface: '#FCF8F2',
      text: '#2E1E22',
      mutedText: '#6E5056',
      accent: '#A85665',
      border: 'rgba(138, 79, 91, 0.22)',
      petalColor: '#DFABB3',
      isDark: false,
    },
    motif: 'homework-stars',
    moonPhase: 0.42,
    moonLabel: 'Waxing Crescent',
  },
  {
    id: 3,
    kind: 'memory',
    kicker: 'Chapter II · Until Dawn',
    title: "A night that didn't need an ending",
    message:
      'I still remember that night when no one was home and we ended up talking all night. Somehow, hours with you never felt like hours.',
    palette: {
      bg: '#4A1B25',
      surface: '#5B232F',
      text: '#FAF2EA',
      mutedText: '#DFC5C8',
      accent: '#E3B4A8',
      border: 'rgba(245, 224, 214, 0.22)',
      petalColor: '#C97B88',
      isDark: true,
    },
    motif: 'telephone-dahlia',
    moonPhase: 0.64,
    moonLabel: 'Waxing Gibbous',
    artPlate: {
      plateKey: 'vintage-telephone',
      alt: 'Antique brass and burgundy rotary telephone surrounded by pressed burgundy dahlias, blush roses, and nocturnal moths',
      caption: 'Plate II · The Midnight Telephone',
      aspect: '3/4',
    },
  },
  {
    id: 4,
    kind: 'memory',
    kicker: 'Chapter III · Miles Between',
    title: 'Distance never really won',
    message:
      "Even when you went away to military school, you'd text me whenever your parents came to meet you. Those little moments meant more than you probably knew.",
    palette: {
      bg: '#DFE8F0',
      surface: '#F4F7FA',
      text: '#1D2D3D',
      mutedText: '#4B6378',
      accent: '#4F708F',
      border: 'rgba(65, 93, 120, 0.22)',
      petalColor: '#98B2C9',
      isDark: false,
    },
    motif: 'military-letter',
    moonPhase: 0.82,
    moonLabel: 'Waxing Gibbous',
    hasInteractiveEnvelope: true,
  },
  {
    id: 5,
    kind: 'centerpiece',
    kicker: 'Chapter IV · The Promise',
    title: 'The moon knows',
    lines: [
      'We once made a little agreement.',
      'Whenever we miss each other, we look at the moon.',
      'I still do.',
      'And every time I see it, a little part of me thinks of you.',
    ],
    palette: {
      bg: '#0D1829',
      surface: '#14233B',
      text: '#F3F6FA',
      mutedText: '#B8C7DC',
      accent: '#D6E2F0',
      border: 'rgba(205, 222, 245, 0.2)',
      petalColor: '#9FB6D4',
      isDark: true,
    },
    motif: 'silver-moon',
    moonPhase: 1.0,
    moonLabel: 'Full Silver Moon',
    artPlate: {
      plateKey: 'full-silver-moon',
      alt: 'Luminous full silver moon framed by night-blooming white jasmine and constellations on midnight blue',
      caption: 'Plate III · Plenilunium',
      aspect: '1/1',
    },
  },
  {
    id: 6,
    kind: 'transition',
    kicker: 'Interlude · Turning the Page',
    lines: [
      "Enough about the memories we've already made.",
      'Today, I hope life gives you a thousand more reasons to smile.',
      'And if I could wish you anything, it would be these...',
    ],
    palette: {
      bg: '#FAF4EA',
      surface: '#F3E9DA',
      text: '#2A2122',
      mutedText: '#6A5859',
      accent: '#A65866',
      border: 'rgba(132, 96, 92, 0.22)',
      petalColor: '#DDA5AE',
      isDark: false,
    },
    motif: 'transition-rose',
    moonPhase: 0.92,
    moonLabel: 'Waning Gibbous',
    hasInteractiveFlower: true,
  },
  {
    id: 7,
    kind: 'wish',
    kicker: 'Birthday Wish I of X · Blush Pink',
    title: 'A SMILE BEFORE SLEEP',
    message: 'I wish you more days when you fall asleep with a smile.',
    palette: {
      bg: '#F7E3E6',
      surface: '#FDF7F7',
      text: '#381D23',
      mutedText: '#724952',
      accent: '#A94F60',
      border: 'rgba(145, 72, 87, 0.22)',
      petalColor: '#DCA0AB',
      isDark: false,
    },
    motif: 'wish-blush-rose',
    moonPhase: 0.85,
    moonLabel: 'Waning Gibbous',
  },
  {
    id: 8,
    kind: 'wish',
    kicker: 'Birthday Wish II of X · Lavender',
    title: 'DREAMS THAT FIND YOU',
    message: 'May your dreams come true faster than you have time to make them.',
    palette: {
      bg: '#ECE6F5',
      surface: '#F8F5FC',
      text: '#261E38',
      mutedText: '#5B4D75',
      accent: '#6F589C',
      border: 'rgba(104, 83, 148, 0.22)',
      petalColor: '#B5A3D6',
      isDark: false,
    },
    motif: 'wish-lavender',
    moonPhase: 0.78,
    moonLabel: 'Waning Gibbous',
  },
  {
    id: 9,
    kind: 'wish',
    kicker: 'Birthday Wish III of X · Powder Blue',
    title: 'THE PEOPLE WHO GET YOU',
    message: 'I wish you to meet people who understand you with just half a word.',
    palette: {
      bg: '#E2ECF4',
      surface: '#F5F9FC',
      text: '#1B2D3E',
      mutedText: '#49637A',
      accent: '#4C7496',
      border: 'rgba(72, 108, 140, 0.22)',
      petalColor: '#9BB9D4',
      isDark: false,
    },
    motif: 'wish-powder-blue',
    moonPhase: 0.7,
    moonLabel: 'Waning Gibbous',
  },
  {
    id: 10,
    kind: 'wish',
    kicker: 'Birthday Wish IV of X · Burgundy',
    title: 'THE COURAGE TO BEGIN',
    message: 'May you always have the courage to do what you plan.',
    palette: {
      bg: '#4E1D27',
      surface: '#612531',
      text: '#FBF3EC',
      mutedText: '#E2C6CA',
      accent: '#E6B7AE',
      border: 'rgba(246, 225, 218, 0.22)',
      petalColor: '#C97B89',
      isDark: true,
    },
    motif: 'wish-burgundy-dahlia',
    moonPhase: 0.62,
    moonLabel: 'Last Quarter',
  },
  {
    id: 11,
    kind: 'wish',
    kicker: 'Birthday Wish V of X · Peach',
    title: 'BEAUTIFUL LITTLE SURPRISES',
    message: 'I wish you moments that take your breath away.',
    palette: {
      bg: '#F8E5D8',
      surface: '#FEF8F3',
      text: '#3B2117',
      mutedText: '#754C3B',
      accent: '#B56345',
      border: 'rgba(166, 94, 67, 0.22)',
      petalColor: '#E0A489',
      isDark: false,
    },
    motif: 'wish-peach-blossom',
    moonPhase: 0.54,
    moonLabel: 'Last Quarter',
  },
  {
    id: 12,
    kind: 'wish',
    kicker: 'Birthday Wish VI of X · Sage Green',
    title: 'TRUST YOURSELF',
    message: 'May your intuition never let you down.',
    palette: {
      bg: '#E2ECE1',
      surface: '#F5F9F4',
      text: '#1D3021',
      mutedText: '#49664F',
      accent: '#4E7554',
      border: 'rgba(74, 112, 80, 0.22)',
      petalColor: '#9BB89E',
      isDark: false,
    },
    motif: 'wish-sage-olive',
    moonPhase: 0.46,
    moonLabel: 'Waning Crescent',
  },
  {
    id: 13,
    kind: 'wish',
    kicker: 'Birthday Wish VII of X · Butter Yellow',
    title: 'FALL IN LOVE WITH LIFE',
    message: 'I wish you to fall in love with life again every single day.',
    palette: {
      bg: '#F9F0D4',
      surface: '#FEFBF0',
      text: '#362B12',
      mutedText: '#6E5B2D',
      accent: '#9E7B26',
      border: 'rgba(148, 115, 36, 0.22)',
      petalColor: '#DEC06F',
      isDark: false,
    },
    motif: 'wish-buttercup',
    moonPhase: 0.39,
    moonLabel: 'Waning Crescent',
  },
  {
    id: 14,
    kind: 'wish',
    kicker: 'Birthday Wish VIII of X · Dusty Rose',
    title: 'ENERGY FOR WHAT MATTERS',
    message: 'May you always have enough energy for what truly matters.',
    palette: {
      bg: '#EED7DC',
      surface: '#FAF2F4',
      text: '#381C23',
      mutedText: '#6E454F',
      accent: '#9E5262',
      border: 'rgba(145, 76, 90, 0.22)',
      petalColor: '#CE939F',
      isDark: false,
    },
    motif: 'wish-dusty-peony',
    moonPhase: 0.33,
    moonLabel: 'Waning Crescent',
  },
  {
    id: 15,
    kind: 'wish',
    kicker: 'Birthday Wish IX of X · Dark Plum',
    title: 'PEOPLE WHO DESERVE YOU',
    message: 'I wish you to surround yourself only with people who truly deserve you.',
    palette: {
      bg: '#2C1A2E',
      surface: '#3B233E',
      text: '#F7EFF8',
      mutedText: '#D5BFD8',
      accent: '#D9AED6',
      border: 'rgba(232, 204, 232, 0.2)',
      petalColor: '#B889B5',
      isDark: true,
    },
    motif: 'wish-plum-hellebore',
    moonPhase: 0.28,
    moonLabel: 'Waning Crescent',
  },
  {
    id: 16,
    kind: 'wish',
    kicker: 'Birthday Wish X of X · Midnight Navy',
    title: 'A YEAR THAT FEELS BEAUTIFUL',
    message:
      'May each new year of your life be better than the last not in numbers, but in how it feels.',
    palette: {
      bg: '#101C2E',
      surface: '#172740',
      text: '#F3F6FB',
      mutedText: '#BAC9DE',
      accent: '#C9D8EC',
      border: 'rgba(202, 218, 240, 0.2)',
      petalColor: '#9CB3D1',
      isDark: true,
    },
    motif: 'wish-midnight-jasmine',
    moonPhase: 0.24,
    moonLabel: 'Waning Crescent',
  },
];

export const FINAL_ENDING = {
  kicker: 'Epilogue · Under the Same Sky',
  sequenceLines: [
    'Remember our little agreement?',
    'Whenever you miss me, look at the moon.',
    "And whenever I do, I'll be looking at it too.",
  ],
  greeting: 'Happy Birthday, Manjiri.',
  finalMessage:
    'No matter how far life takes us, I hope the moon always reminds you that somewhere, someone is wishing you the very best.',
  signature: 'The same moon. Always.',
  palette: {
    bg: '#0B1322',
    surface: '#121E34',
    text: '#F4F7FC',
    mutedText: '#B7C6DC',
    accent: '#D8E3F2',
    border: 'rgba(205, 221, 245, 0.2)',
    petalColor: '#A9BEDA',
    isDark: true,
  } satisfies SlidePalette,
  moonPhase: 0.2,
  moonLabel: 'Glowing Crescent Moon',
  artPlate: {
    plateKey: 'ending-crescent-moon' as ArtPlateKey,
    alt: 'Glowing silver crescent moon suspended in a midnight navy sky above pressed white roses and lavender sprigs',
    caption: 'Plate IV · The Same Moon, Always',
    aspect: '3/4' as const,
  },
};
