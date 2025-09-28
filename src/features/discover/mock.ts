import type { JamSession } from '@/api/jams/services/types';
import { mockMusicianProfiles } from '@/api/profiles/services/mock';
import type { MusicianProfile } from '@/api/profiles/services/types';

export type Band = {
  id: string;
  name: string;
  description: string;
  genre: string[];
  members: Partial<MusicianProfile>[];
  lookingFor: string[];
  location: string;
  image: string;
  followers: number;
  upcomingShows: number;
};

export type Post = {
  id: string;
  type: 'soundbite' | 'announcement' | 'collaboration';
  author: Partial<MusicianProfile>;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  media?: {
    type: 'audio' | 'image' | 'video';
    url: string;
    title?: string;
  };
  tags?: string[];
};

export type FeedItem = {
  id: string;
  type: 'musician' | 'jam' | 'band' | 'post';
  data: MusicianProfile | JamSession | Band | Post;
  timestamp: string;
};

// Mock data for the unified feed
const mockBands: Band[] = [
  {
    id: 'band1',
    name: 'Midnight Echoes',
    description:
      'Indie rock band looking for a bassist to complete our sound. We practice twice a week and have upcoming gigs lined up.',
    genre: ['Indie Rock', 'Alternative'],
    members: [mockMusicianProfiles[1], mockMusicianProfiles[2]],
    lookingFor: ['Bass', 'Keyboard'],
    location: 'Seattle, WA',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHJvY2slMjBiYW5kfGVufDF8fHx8MTc1ODAwODM1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    followers: 127,
    upcomingShows: 3,
  },
];

const mockPosts: Post[] = [
  {
    id: 'post1',
    type: 'soundbite',
    author: mockMusicianProfiles[0],
    content:
      "Just finished recording this acoustic version of my new song 'Whispered Dreams'. Would love feedback from fellow songwriters! 🎵",
    timestamp: '2025-01-18T14:30:00Z',
    likes: 23,
    comments: 8,
    media: {
      type: 'audio',
      url: 'https://example.com/audio.mp3',
      title: 'Whispered Dreams (Acoustic)',
    },
    tags: ['original', 'acoustic', 'folk'],
  },
  {
    id: 'post2',
    type: 'collaboration',
    author: mockMusicianProfiles[1],
    content:
      'Looking for a saxophonist to collaborate on a jazz fusion project. I have 5 original compositions ready to go. DM me if interested!',
    timestamp: '2025-01-18T11:15:00Z',
    likes: 15,
    comments: 12,
    tags: ['collaboration', 'jazz', 'fusion'],
  },
];

const mockJamSessions: JamSession[] = [
  {
    id: 'jam1',
    title: 'Sunday Jazz Jam',
    description:
      "Relaxed jazz session in downtown. All skill levels welcome! We'll have a piano and drum kit available.",
    host: mockMusicianProfiles[1],
    date: '2025-01-19',
    time: '14:00',
    location: 'Blue Note Cafe',
    address: '1234 Jazz Street, Seattle, WA 98101',
    maxParticipants: 6,
    currentParticipants: 3,
    genres: ['Jazz', 'Blues'],
    skillLevel: 'All Levels',
    type: 'open',
    participants: [],
    setlist: [],
    neededInstruments: ['Bass', 'Trumpet'],
    equipment: ['Piano', 'Drum Kit', 'PA System'],
    price: 15,
  },
];

// Create unified feed with mixed content
export const createFeedItems = (): FeedItem[] => {
  const items: FeedItem[] = [
    ...mockMusicianProfiles.map((musician) => ({
      id: `musician-${musician.id}`,
      type: 'musician' as const,
      data: musician,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    })),
    ...mockJamSessions.map((jam) => ({
      id: `jam-${jam.id}`,
      type: 'jam' as const,
      data: jam,
      timestamp: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString(),
    })),
    // ...mockBands.map((band) => ({
    //   id: `band-${band.id}`,
    //   type: 'band' as const,
    //   data: band,
    //   timestamp: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000).toISOString(),
    // })),
    // ...mockPosts.map((post) => ({
    //   id: `post-${post.id}`,
    //   type: 'post' as const,
    //   data: post,
    //   timestamp: post.timestamp,
    // })),
  ];

  return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
