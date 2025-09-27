import type { MusicianProfile } from './types';

export const mockMusicianProfiles: MusicianProfile[] = [
  {
    id: 'u1',
    name: 'Alice Johnson',
    image:
      'https://media.discordapp.net/attachments/702862051957145653/1419255646792192030/image_720.png?ex=68d269d2&is=68d11852&hm=ed303074e7248c1d0f2d8e9ab55508d2cb21bd45eb162f0d86d47e91e6291989&=&format=webp&quality=lossless&width=806&height=806',
    songs: [
      { title: 'Wonderwall', artist: 'Oasis', wantToPlay: true, enjoy: true, skill: 3 },
      { title: 'Blackbird', artist: 'The Beatles', wantToPlay: false, enjoy: true, skill: 4 },
      { title: 'Fast Car', artist: 'Tracy Chapman', wantToPlay: true, enjoy: false, skill: 2 },
    ],
    lookingFor: ['Recording Projects', 'Live Performances', 'Experimental Music'],
    instruments: ['Guitar', 'Ukulele'],
    genres: ['Indie', 'Folk', 'Rock'],
    bio: `I’m a self-taught guitarist with about 5 years of experience, and I love acoustic sessions and songwriting. 
      
I started with simple campfire songs and grew into fingerstyle arrangements over time. I’m passionate about how music brings people together and I often experiment with open tunings. When I’m not jamming, I like writing my own songs and recording small demos with friends.`,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      timeOfDay: ['Evening', 'Weekend'],
      frequency: '2-3 times per week',
    },
    vibes: [
      {
        question: 'Three artists I wish I could jam with:',
        answer: 'Joni Mitchell, Phoebe Bridgers, Ed Sheeran',
      },
      { question: 'My sound is a mix of...', answer: 'Indie folk and heartfelt acoustic pop.' },
      {
        question: 'My ultimate musical dream-collab:',
        answer: 'A songwriting session with Taylor Swift.',
      },
    ],

    // 🔽 Extra fields for UserProfileData
    primaryInstruments: ['Guitar'],
    secondaryInstruments: ['Ukulele'],
    preferredGenres: ['Indie', 'Folk'],
    collaborationInterests: ['Songwriting', 'Acoustic Jams'],
    preferredJamSettings: ['Acoustic', 'Small groups'],
    preferredDateTime: ['Weekends', 'Evenings'],
    musicLinks: [
      { type: 'youtube', url: 'https://youtube.com/alicejohnson', title: 'Alice’s Covers' },
    ],
    socialLinks: [{ type: 'instagram', url: 'https://instagram.com/alicejohnson' }],
    jamHistory: [
      {
        id: 'j1',
        title: 'Indie Night Jam',
        date: '2025-01-12',
        type: 'past',
        role: 'participant',
        genre: 'Indie',
      },
    ],
    influences: 'Joni Mitchell, Phoebe Bridgers, Ed Sheeran',
    performanceStyle: 'Fingerstyle acoustic with storytelling',
    musicalGoals: 'Collaborate with more songwriters and perform original music',
    yearsExperience: 5,
    isAvailableForCollab: true,
  },
  {
    id: 'u2',
    name: 'Marcus Lee',
    image: 'https://i.pinimg.com/1200x/12/8c/ac/128cacd89a9c41e3c4e2d1c8fc18d055.jpg',
    songs: [
      { title: 'Take Five', artist: 'Dave Brubeck', wantToPlay: true, enjoy: true, skill: 5 },
      { title: 'So What', artist: 'Miles Davis', wantToPlay: false, enjoy: true, skill: 4 },
      { title: 'Spain', artist: 'Chick Corea', wantToPlay: true, enjoy: false, skill: 3 },
    ],
    lookingFor: ['Recording Projects', 'Live Performances', 'Experimental Music'],
    instruments: ['Piano', 'Saxophone'],
    genres: ['Jazz', 'Blues'],
    bio: `I trained classically on piano for nearly a decade, but eventually fell in love with jazz and the freedom it gives me to improvise. These days I enjoy both structured playing and completely unplanned jam sessions. 
    
I’m especially interested in modal improvisation and complex chord progressions. Outside of performing, I spend time teaching, and I run a small jazz club where we listen, analyze, and play together.`,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      timeOfDay: ['Evening', 'Weekend'],
      frequency: '2-3 times per week',
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

    // 🔽 Extra fields
    primaryInstruments: ['Piano'],
    secondaryInstruments: ['Saxophone'],
    preferredGenres: ['Jazz', 'Blues'],
    collaborationInterests: ['Improvisation', 'Ensemble work'],
    preferredJamSettings: ['Live clubs', 'Studio sessions'],
    preferredDateTime: ['Weeknights', 'Weekends'],
    musicLinks: [
      { type: 'spotify', url: 'https://spotify.com/marcuslee', title: 'Marcus Jazz Trio' },
    ],
    socialLinks: [{ type: 'twitter', url: 'https://twitter.com/marcuslee' }],
    jamHistory: [
      {
        id: 'j2',
        title: 'Blue Note Jam',
        date: '2025-02-05',
        type: 'upcoming',
        role: 'host',
        genre: 'Jazz',
      },
    ],
    influences: 'Bill Evans, Chick Corea, Thelonious Monk',
    performanceStyle: 'Modal jazz with improvisational flair',
    musicalGoals: 'Record a live album and expand jazz education initiatives',
    yearsExperience: 12,
    isAvailableForCollab: true,
  },
  {
    id: 'u3',
    name: 'Sofia Ramirez',
    image: 'https://i.pinimg.com/736x/c8/82/dd/c882dd4f6141cebb6627c0f8db860952.jpg',
    songs: [
      { title: 'Despacito', artist: 'Luis Fonsi', wantToPlay: false, enjoy: true, skill: 4 },
      { title: 'Vivir Mi Vida', artist: 'Marc Anthony', wantToPlay: true, enjoy: true, skill: 5 },
      { title: 'La Cumparsita', artist: 'Carlos Gardel', wantToPlay: true, enjoy: false, skill: 2 },
    ],
    lookingFor: ['Recording Projects', 'Live Performances', 'Experimental Music'],
    instruments: ['Vocals', 'Percussion'],
    genres: ['Latin', 'Pop', 'World'],
    bio: `I’m a singer with roots in Latin music. I love mixing traditional rhythms with modern pop and bringing that energy into every performance. Music has always been part of my family, and now I want to share that passion with others.`,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      timeOfDay: ['Evening', 'Weekend'],
      frequency: '2-3 times per week',
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

    // 🔽 Extra fields
    primaryInstruments: ['Vocals'],
    secondaryInstruments: ['Percussion'],
    preferredGenres: ['Latin', 'Pop'],
    collaborationInterests: ['World music fusion', 'Live performance'],
    preferredJamSettings: ['Festivals', 'Open-air stages'],
    preferredDateTime: ['Weekends'],
    musicLinks: [
      {
        type: 'soundcloud',
        url: 'https://soundcloud.com/sofiaramirez',
        title: 'Sofia Live Sessions',
      },
    ],
    socialLinks: [{ type: 'facebook', url: 'https://facebook.com/sofiaramirez' }],
    jamHistory: [
      {
        id: 'j3',
        title: 'Latin Beats Jam',
        date: '2025-03-10',
        type: 'upcoming',
        role: 'participant',
        genre: 'Latin',
      },
    ],
    influences: 'Celia Cruz, Marc Anthony, Rosalía',
    performanceStyle: 'Energetic Latin pop fusion with strong vocals',
    musicalGoals: 'Bring Latin music to global stages and record a crossover album',
    yearsExperience: 8,
    isAvailableForCollab: true,
  },
] as const;
