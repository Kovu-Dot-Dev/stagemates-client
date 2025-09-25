import type { JamSession } from '@/api/jams/services/types';
import type { MusicianProfile } from '@/api/profiles/services/types';

export type Band = {
  id: string;
  name: string;
  description: string;
  genre: string[];
  members: Omit<MusicianProfile, 'songs'>[];
  lookingFor: string[];
  location: string;
  image: string;
  followers: number;
  upcomingShows: number;
};

export type Post = {
  id: string;
  type: 'soundbite' | 'announcement' | 'collaboration';
  author: Omit<MusicianProfile, 'songs'>;
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
    members: [
      {
        id: 'm1',
        name: 'Alex Rivera',
        bio: '',
        location: 'Seattle, WA',
        instruments: ['Guitar', 'Vocals'],
        genres: ['Indie', 'Rock'],
        skillLevel: 'Intermediate',
        lookingFor: [],
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMG11c2ljaWFuJTIwZ3VpdGFyfGVufDF8fHx8MTc1ODAwODM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: 'm2',
        name: 'Jordan Kim',
        bio: '',
        location: 'Seattle, WA',
        instruments: ['Drums'],
        genres: ['Indie', 'Rock'],
        skillLevel: 'Advanced',
        lookingFor: [],
        image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMG11c2ljaWFuJTIwZHJ1bXN8ZW58MXx8fHwxNzU4MDA4MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
    ],
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
    author: {
      id: 'demo1',
      name: 'Sarah Chen',
      bio: '',
      location: 'Portland, OR',
      instruments: ['Vocals', 'Guitar'],
      genres: ['Indie', 'Folk'],
      skillLevel: 'Intermediate',
      lookingFor: [],
      image:
        'https://images.unsplash.com/photo-1588374481268-6cf95436cde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZSUyMHdvbWFuJTIwbXVzaWNpYW4lMjBzaW5nZXJ8ZW58MXx8fHwxNzU4MDA3ODgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
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
    author: {
      id: 'demo2',
      name: 'Marcus Williams',
      bio: '',
      location: 'Brooklyn, NY',
      instruments: ['Piano', 'Keyboard'],
      genres: ['Jazz', 'Fusion'],
      skillLevel: 'Advanced',
      lookingFor: [],
      image:
        'https://images.unsplash.com/photo-1681070907979-33fb54f56c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMG11c2ljaWFuJTIwcGlhbm98ZW58MXx8fHwxNzU4MDA3ODg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
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
    host: {
      id: 'host1',
      name: 'Marcus Williams',
      bio: '',
      location: 'Seattle, WA',
      instruments: ['Piano', 'Keyboard'],
      genres: ['Jazz'],
      skillLevel: 'Advanced',
      lookingFor: [],
      image:
        'https://images.unsplash.com/photo-1681070907979-33fb54f56c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMG11c2ljaWFuJTIwcGlhbm98ZW58MXx8fHwxNzU4MDA3ODg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
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

const mockMusicians: MusicianProfile[] = [
  {
    id: 'musician1',
    name: 'Elena Rodriguez',
    bio: 'Classically trained violinist exploring world music and electronic fusion. Love creating unique soundscapes.',
    location: 'San Francisco, CA',
    instruments: ['Violin', 'Violin', 'Mandolin'],
    genres: ['Classical', 'World', 'Electronic', 'Fusion'],
    skillLevel: 'Professional',
    lookingFor: ['Recording Projects', 'Live Performances', 'Experimental Music'],
    songs: [
      {
        title: 'Echoes of Time',
        artist: 'Elena Rodriguez',
        wantToPlay: true,
        enjoy: true,
        skill: 5,
      },
      {
        title: 'Desert Winds',
        artist: 'Elena Rodriguez',
        wantToPlay: false,
        enjoy: true,
        skill: 4,
      },
      {
        title: 'Urban Nights',
        artist: 'Elena Rodriguez',
        wantToPlay: true,
        enjoy: false,
        skill: 3,
      },
    ],
    image:
      'https://images.unsplash.com/photo-1755389176283-3cd924205df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHZpb2xpbmlzdCUyMG11c2ljaWFufGVufDF8fHx8MTc1ODAwODMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'musician2',
    name: 'Dylan Brooks',
    bio: 'Singer-songwriter with a soulful voice. Writing songs about life, love, and everything in between.',
    location: 'Nashville, TN',
    instruments: ['Vocals', 'Guitar', 'Harmonica'],
    genres: ['Folk', 'Country', 'Blues', 'Americana'],
    skillLevel: 'Intermediate',
    lookingFor: ['Songwriting', 'Open Mics', 'Band Formation'],
    songs: [
      {
        title: 'Road Less Traveled',
        artist: 'Dylan Brooks',
        wantToPlay: true,
        enjoy: true,
        skill: 4,
      },
      {
        title: 'Midnight Train',
        artist: 'Dylan Brooks',
        wantToPlay: false,
        enjoy: true,
        skill: 3,
      },
      {
        title: 'Whiskey and Rain',
        artist: 'Dylan Brooks',
        wantToPlay: true,
        enjoy: false,
        skill: 2,
      },
    ],
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMG11c2ljaWFuJTIwZ3VpdGFyfGVufDF8fHx8MTc1ODAwODM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

// Create unified feed with mixed content
export const createFeedItems = (): FeedItem[] => {
  const items: FeedItem[] = [
    ...mockMusicians.map((musician) => ({
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
    ...mockBands.map((band) => ({
      id: `band-${band.id}`,
      type: 'band' as const,
      data: band,
      timestamp: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000).toISOString(),
    })),
    ...mockPosts.map((post) => ({
      id: `post-${post.id}`,
      type: 'post' as const,
      data: post,
      timestamp: post.timestamp,
    })),
  ];

  return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
