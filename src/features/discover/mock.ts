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

const mockJamSessions: JamSession[] = [
  {
    id: 'jam1',
    title: 'Wednesday Jazz Jam',
    image: 'https://i.pinimg.com/736x/7e/70/a0/7e70a055856e7799e54213cba928cba3.jpg',
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
  {
    id: 'jam2',
    title: 'Indie Rock Night',
    image:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    description:
      'Bring your guitar and join us for a night of indie rock covers and originals. Open to all guitarists and singers!',
    host: mockMusicianProfiles[2],
    date: '2025-01-22',
    time: '19:00',
    location: 'Echo Studio',
    address: '5678 Indie Ave, Seattle, WA 98102',
    maxParticipants: 8,
    currentParticipants: 5,
    genres: ['Indie Rock', 'Alternative'],
    skillLevel: 'Intermediate',
    type: 'open',
    participants: [],
    setlist: [],
    neededInstruments: ['Guitar', 'Vocals'],
    equipment: ['Guitar Amps', 'Microphones', 'PA System'],
    price: 10,
  },
  {
    id: 'jam3',
    title: 'Sunday Acoustic Circle',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description:
      'Unplugged acoustic jam for singer-songwriters. Share your originals or play along with others.',
    host: mockMusicianProfiles[0],
    date: '2025-01-21',
    time: '16:00',
    location: 'Green Lake Park',
    address: '9101 Park Lane, Seattle, WA 98103',
    maxParticipants: 12,
    currentParticipants: 7,
    genres: ['Folk', 'Acoustic', 'Singer-Songwriter'],
    skillLevel: 'All Levels',
    type: 'open',
    participants: [],
    setlist: [],
    neededInstruments: ['Acoustic Guitar', 'Cajon'],
    equipment: ['None'],
    price: 0,
  },
  {
    id: 'jam4',
    title: 'Funk Groove Session',
    image: 'https://i.pinimg.com/1200x/70/5a/8e/705a8e344cdaf65ed88ec6ea802e8755.jpg',
    description:
      'Get your groove on with our monthly funk jam. Bassists and drummers especially welcome!',
    host: mockMusicianProfiles[3] || mockMusicianProfiles[0],
    date: '2025-01-25',
    time: '20:00',
    location: 'Groove Basement',
    address: '2222 Funky St, Seattle, WA 98104',
    maxParticipants: 10,
    currentParticipants: 6,
    genres: ['Funk', 'Soul'],
    skillLevel: 'Advanced',
    type: 'invite',
    participants: [],
    setlist: [],
    neededInstruments: ['Bass', 'Drums', 'Keys'],
    equipment: ['Bass Amp', 'Drum Kit', 'Keyboard'],
    price: 20,
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
  ];

  return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
