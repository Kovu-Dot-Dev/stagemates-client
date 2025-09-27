import type { MusicianProfile } from '@/api/profiles/services/types';

/**
 * TODO: Proper typing. Note all types are in flux.
 * fields now mostly optional until we figure out what goes where
 * so components can render without crashing
 * TODO: remove `.?` from components when fields are required
 */

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
  host: Partial<MusicianProfile>;
  date: string;
  time: string;
  location: string;
  address?: string;
  maxParticipants: number;
  currentParticipants: number;
  genres: string[];
  skillLevel: string;
  type: 'open' | 'private';
  participants: Omit<MusicianProfile, 'songs'>[];
  setlist: SetListSong[];
  neededInstruments: string[];
  equipment?: string[];
  price?: number;
  notes?: string;
  discussion?: DiscussionThread[];
};

export type DiscussionThread = {
  id: string;
  author: Omit<MusicianProfile, 'songs'>;
  content: string;
  timestamp: string;
  replies: DiscussionReply[];
};

export type DiscussionReply = {
  id: string;
  author: Omit<MusicianProfile, 'songs'>;
  content: string;
  timestamp: string;
};
