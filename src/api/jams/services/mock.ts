import { mockMusicianProfiles } from '@/api/profiles/services/mock';

import type { JamSession } from './types';

export const mockJamSessions: JamSession[] = [
  {
    id: '1',
    title: 'Sunday Jazz Jam',
    image: 'https://i.pinimg.com/736x/7e/70/a0/7e70a055856e7799e54213cba928cba3.jpg',
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
    participants: [mockMusicianProfiles[1], mockMusicianProfiles[2]],
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
    discussion: [
      {
        id: 't1',
        author: mockMusicianProfiles[0],
        content:
          'Hey everyone! Excited for this jam — the venue has a Steinway grand piano. Looking forward to hearing everyone’s contributions!',
        timestamp: '2025-01-18T10:30:00Z',
        replies: [
          {
            id: 'r1',
            author: mockMusicianProfiles[1],
            content:
              "Amazing! I'll bring my sax — should I focus on Autumn Leaves or just improvise?",
            timestamp: '2025-01-18T11:15:00Z',
          },
        ],
      },
      {
        id: 't2',
        author: mockMusicianProfiles[2],
        content: 'Quick question: is there good parking around Blue Note Cafe?',
        timestamp: '2025-01-18T14:20:00Z',
        replies: [],
      },
    ],
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
    participants: [mockMusicianProfiles[0], mockMusicianProfiles[2]],
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
    discussion: [
      {
        id: 't3',
        author: mockMusicianProfiles[1],
        content:
          'Hey all, for this session let’s focus on tightening up the chorus of our second song.',
        timestamp: '2025-01-19T16:00:00Z',
        replies: [
          {
            id: 'r2',
            author: mockMusicianProfiles[2],
            content:
              'Got it! I’ll bring my guitar pedalboard so we can experiment with some new tones.',
            timestamp: '2025-01-19T17:00:00Z',
          },
        ],
      },
      {
        id: 't4',
        author: mockMusicianProfiles[0],
        content: 'Do we need to bring our own mics, or will the rehearsal space provide them?',
        timestamp: '2025-01-19T18:45:00Z',
        replies: [],
      },
    ],
  },
  {
    id: '3',
    title: 'Acoustic Songwriting Circle',
    description:
      "Bring your original songs or covers! We'll share, collaborate, and maybe create something new together.",
    host: mockMusicianProfiles[2],
    date: '2025-01-21',
    time: '18:30',
    location: 'Community Center',
    address: '910 Music Valley Dr, Nashville, TN 37214',
    maxParticipants: 8,
    currentParticipants: 5,
    genres: ['Folk', 'Indie', 'Country'],
    skillLevel: 'All Levels',
    type: 'open',
    participants: [mockMusicianProfiles[0], mockMusicianProfiles[1]],
    setlist: [],
    neededInstruments: ['Banjo', 'Cajon'],
    equipment: ['Acoustic Amplifier', 'Microphones'],
    notes: "Bring your own acoustic instruments. We'll have coffee and snacks available.",
    discussion: [
      {
        id: 't5',
        author: mockMusicianProfiles[2],
        content:
          'Can’t wait to hear what original songs people are bringing! I’ll start with one of my folk ballads.',
        timestamp: '2025-01-20T12:30:00Z',
        replies: [
          {
            id: 'r3',
            author: mockMusicianProfiles[0],
            content:
              'Sounds great! I’ll bring a couple of indie-inspired chord progressions we could jam on.',
            timestamp: '2025-01-20T13:15:00Z',
          },
        ],
      },
      {
        id: 't6',
        author: mockMusicianProfiles[1],
        content: 'Will there be a PA available for vocals, or should we stick to unplugged?',
        timestamp: '2025-01-20T14:45:00Z',
        replies: [],
      },
    ],
  },
];
