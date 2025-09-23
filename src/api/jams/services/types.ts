import type { MusicianProfile } from '@/api/profiles/services/types';
export type SetListSong = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration?: number;
  key?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  suggestedBy: string; // participant name
};

export type JamSession = {
  id: string;
  title: string;
  description: string;
  host: MusicianProfile;
  date: string;
  time: string;
  location: string;
  address?: string;
  maxParticipants: number;
  currentParticipants: number;
  genres: string[];
  skillLevel: string;
  type: 'open' | 'private';
  participants: MusicianProfile[];
  setlist: SetListSong[];
  neededInstruments: string[];
  equipment?: string[];
  price?: number;
  notes?: string;
  discussion?: DiscussionThread[];
};

export type DiscussionThread = {
  id: string;
  author: MusicianProfile;
  content: string;
  timestamp: string;
  replies: DiscussionReply[];
};

export type DiscussionReply = {
  id: string;
  author: MusicianProfile;
  content: string;
  timestamp: string;
};
