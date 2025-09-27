import { mockMusicianProfiles } from '@/api/profiles/services/mock';

import type { JamSession } from './types';

export const mockJamSessions: JamSession[] = [
  {
    id: '1',
    title: 'Sunday Jazz Jam',
    description:
      "Relaxed jazz session in downtown. All skill levels welcome! We'll have a piano and drum kit available.",
    host: mockMusicianProfiles[0],
    date: '2025-01-19',
    time: '14:00',
    location: 'Blue Note Cafe',
    address: '1234 Jazz Street, Seattle, WA 98101',
    maxParticipants: 6,
    currentParticipants: 3,
    genres: ['Jazz', 'Blues'],
    skillLevel: 'All Levels',
    type: 'open',
    participants: [
      mockMusicianProfiles[1],
      mockMusicianProfiles[2],
    ],
    setlist: [
      {
        id: 's1',
        title: 'Autumn Leaves',
        artist: 'Les Paul',
        genre: 'Jazz',
        difficulty: 'Medium',
        duration: 5,
        key: 'Gm',
        suggestedBy: 'Marcus Williams',
      },
      {
        id: 's2',
        title: 'Blue Bossa',
        artist: 'Kenny Dorham',
        genre: 'Jazz',
        difficulty: 'Medium',
        duration: 6,
        key: 'Cm',
        suggestedBy: 'Alice Johnson',
      },
    ],
    neededInstruments: ['Bass', 'Trumpet'],
    equipment: ['Piano', 'Drum Kit', 'PA System', 'Microphones'],
    price: 15,
    discussion: [], // (could also map in mockMusicianProfiles if needed)
  },
  {
    id: '2',
    title: 'Rock Band Practice',
    description:
      'Looking for a bassist and drummer to complete our indie rock band. We have original songs ready to jam!',
    host: mockMusicianProfiles[1],
    date: '2025-01-20',
    time: '19:00',
    location: 'Rehearsal Space',
    address: '5678 Music Row, Austin, TX 78701',
    maxParticipants: 4,
    currentParticipants: 2,
    genres: ['Rock', 'Indie', 'Alternative'],
    skillLevel: 'Intermediate',
    type: 'open',
    participants: [
      mockMusicianProfiles[0],
      mockMusicianProfiles[2], 
    ],
    setlist: [
      {
        id: 's3',
        title: 'Midnight City',
        artist: 'Original',
        genre: 'Indie Rock',
        difficulty: 'Hard',
        duration: 4,
        key: 'Em',
        suggestedBy: 'Sarah Miller',
      },
    ],
    neededInstruments: ['Bass', 'Drums'],
    equipment: ['Amplifiers', 'Microphones'],
    notes:
      'We have 3 original songs to work through. Looking for committed musicians for potential band formation.',
    discussion: [],
  },
  {
    id: '3',
    title: 'Acoustic Songwriting Circle',
    description:
      "Bring your original songs or covers! We'll share, collaborate, and maybe create something new together.",
    host:  mockMusicianProfiles[2], 
    date: '2025-01-21',
    time: '18:30',
    location: 'Community Center',
    address: '910 Music Valley Dr, Nashville, TN 37214',
    maxParticipants: 8,
    currentParticipants: 5,
    genres: ['Folk', 'Indie', 'Country'],
    skillLevel: 'All Levels',
    type: 'open',
    participants: [
      mockMusicianProfiles[0],
      mockMusicianProfiles[1],
    ],
    setlist: [],
    neededInstruments: ['Banjo', 'Cajon'],
    equipment: ['Acoustic Amplifier', 'Microphones'],
    notes: "Bring your own acoustic instruments. We'll have coffee and snacks available.",
    discussion: [],
  },
];
