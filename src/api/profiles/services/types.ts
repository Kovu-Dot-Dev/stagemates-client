/**
 * TODO: Proper typing. Note all types are in flux.
 * fields now mostly optional until we figure out what goes where
 * so components can render without crashing
 * TODO: remove `.?` from components when fields are required
 */
export type MusicianProfile = {
  id: string;
  name: string;
  image?: string;
  bio?: string;
  lookingFor?: string[];
  location?: string;
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  songs?: Song[];
  instruments?: Instrument[];
  genres?: Genre[];
  availability?: {
    days?: string[];
    times?: string[];
  };
  vibes?: Vibe[];
};

export type Vibe = {
  question: string;
  answer: string;
};

export type Song = {
  title: string;
  artist: string;
  wantToPlay: boolean;
  enjoy: boolean;
  skill: 1 | 2 | 3 | 4 | 5;
};

export const INSTRUMENTS = {
  GUITAR: 'Guitar',
  BASS: 'Bass',
  DRUMS: 'Drums',
  PIANO: 'Piano',
  KEYBOARD: 'Keyboard',
  VIOLIN: 'Violin',
  CELLO: 'Cello',
  FLUTE: 'Flute',
  CLARINET: 'Clarinet',
  SAXOPHONE: 'Saxophone',
  TRUMPET: 'Trumpet',
  TROMBONE: 'Trombone',
  HARMONICA: 'Harmonica',
  BANJO: 'Banjo',
  MANDOLIN: 'Mandolin',
  UKULELE: 'Ukulele',
  HARP: 'Harp',
  ACCORDION: 'Accordion',
  PERCUSSION: 'Percussion',
  VOCALS: 'Vocals',
} as const;

export type Instrument = (typeof INSTRUMENTS)[keyof typeof INSTRUMENTS];

export const GENRES = {
  ROCK: 'Rock',
  JAZZ: 'Jazz',
  POP: 'Pop',
  FOLK: 'Folk',
  BLUES: 'Blues',
  LATIN: 'Latin',
  INDIE: 'Indie',
  WORLD: 'World',
} as const;

export type Genre = (typeof GENRES)[keyof typeof GENRES];
