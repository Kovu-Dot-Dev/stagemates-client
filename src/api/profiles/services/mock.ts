import type { MusicianProfile } from './types';

export const mockMusicianProfiles: MusicianProfile[] = [
  {
    id: 'u1',
    name: 'Alice Johnson',
    songs: [
      {
        title: 'Wonderwall',
        artist: 'Oasis',
        wantToPlay: true,
        enjoy: true,
        skill: 3,
      },
      {
        title: 'Blackbird',
        artist: 'The Beatles',
        wantToPlay: false,
        enjoy: true,
        skill: 4,
      },
      {
        title: 'Fast Car',
        artist: 'Tracy Chapman',
        wantToPlay: true,
        enjoy: false,
        skill: 2,
      },
    ],
    instruments: ['Guitar', 'Ukulele'],
    genres: ['Indie', 'Folk', 'Rock'],
    background: `I’m a self-taught guitarist with about 5 years of experience, and I love acoustic sessions and songwriting. 
      
I started with simple campfire songs and grew into fingerstyle arrangements over time. I’m passionate about how music brings people together and I often experiment with open tunings. When I’m not jamming, I like writing my own songs and recording small demos with friends.`,
    availability: {
      days: ['Friday', 'Saturday'],
      times: ['Evenings', 'Late Night'],
    },
    vibes: [
      {
        question: 'Three artists I wish I could jam with:',
        answer: 'Joni Mitchell, Phoebe Bridgers, Ed Sheeran',
      },
      {
        question: 'My sound is a mix of...',
        answer: 'Indie folk and heartfelt acoustic pop.',
      },
      {
        question: 'My ultimate musical dream-collab:',
        answer: 'A songwriting session with Taylor Swift.',
      },
    ],
  },
  {
    id: 'u2',
    name: 'Marcus Lee',
    songs: [
      {
        title: 'Take Five',
        artist: 'Dave Brubeck',
        wantToPlay: true,
        enjoy: true,
        skill: 5,
      },
      {
        title: 'So What',
        artist: 'Miles Davis',
        wantToPlay: false,
        enjoy: true,
        skill: 4,
      },
      {
        title: 'Spain',
        artist: 'Chick Corea',
        wantToPlay: true,
        enjoy: false,
        skill: 3,
      },
    ],
    instruments: ['Piano', 'Saxophone'],
    genres: ['Jazz', 'Blues'],
    background: `I trained classically on piano for nearly a decade, but eventually fell in love with jazz and the freedom it gives me to improvise. These days I enjoy both structured playing and completely unplanned jam sessions. 
    
I’m especially interested in modal improvisation and complex chord progressions. Outside of performing, I spend time teaching, and I run a small jazz club where we listen, analyze, and play together.`,
    availability: {
      days: ['Wednesday', 'Sunday'],
      times: ['Afternoons', 'Evenings'],
    },
    vibes: [
      {
        question: 'Three artists I wish I could jam with:',
        answer: 'Herbie Hancock, Esperanza Spalding, John Coltrane',
      },
      {
        question: 'My sound is a mix of...',
        answer: 'Modal jazz, blues, and improvisational freedom.',
      },
      {
        question: 'My ultimate musical dream-collab:',
        answer: 'Trading solos with Chick Corea on stage.',
      },
    ],
  },
  {
    id: 'u3',
    name: 'Sofia Ramirez',
    songs: [
      {
        title: 'Despacito',
        artist: 'Luis Fonsi',
        wantToPlay: false,
        enjoy: true,
        skill: 4,
      },
      {
        title: 'Vivir Mi Vida',
        artist: 'Marc Anthony',
        wantToPlay: true,
        enjoy: true,
        skill: 5,
      },
      {
        title: 'La Cumparsita',
        artist: 'Carlos Gardel',
        wantToPlay: true,
        enjoy: false,
        skill: 2,
      },
    ],
    instruments: ['Vocals', 'Percussion'],
    genres: ['Latin', 'Pop', 'World'],
    background: `I’m a singer with roots in Latin music. I love mixing traditional rhythms with modern pop and bringing that energy into every performance. Music has always been part of my family, and now I want to share that passion with others.`,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      times: ['Mornings', 'Evenings'],
    },
    vibes: [
      {
        question: 'Three artists I wish I could jam with:',
        answer: 'Shakira, Marc Anthony, Rosalía',
      },
      {
        question: 'My sound is a mix of...',
        answer: 'Latin rhythms, pop melodies, and heartfelt vocals.',
      },
      {
        question: 'My ultimate musical dream-collab:',
        answer: 'A salsa-pop fusion with Carlos Vives.',
      },
    ],
  },
] as const;
