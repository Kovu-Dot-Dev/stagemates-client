/**
 * TODO: Proper typing. Note all types are in flux.
 * fields now mostly optional until we figure out what goes where
 * so components can render without crashing
 * TODO: remove `.?` from components when fields are required
 */
export type MusicianProfile = {
  id: string;
  name: string;
  image: string;
  bio: string;
  lookingFor?: string[];
  location?: string;
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Professional';
  songs: Song[];
  instruments: string[];
  genres: string[];
  availability: {
    days: string[];
    timeOfDay: string[];
    frequency: string;
  };
  vibes?: Vibe[];

    soundCloudUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
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

export interface UserProfileData extends MusicianProfile {
  primaryInstruments: string[];
  secondaryInstruments: string[];
  preferredGenres: string[];
  collaborationInterests: string[];
  availability: {
    days: string[];
    timeOfDay: string[];
    frequency: string;
  };
  preferredJamSettings: string[];
  preferredDateTime: string[];
  musicLinks: {
    type: 'spotify' | 'youtube' | 'soundcloud' | 'bandcamp' | 'website';
    url: string;
    title?: string;
  }[];
  socialLinks: {
    type: 'instagram' | 'twitter' | 'facebook' | 'website';
    url: string;
  }[];
  jamHistory: JamHistoryItem[];
  influences: string;
  performanceStyle: string;
  musicalGoals: string;
  yearsExperience: number;
  isAvailableForCollab: boolean;
}

export interface JamHistoryItem {
  id: string;
  title: string;
  date: string;
  type: 'past' | 'upcoming';
  role: 'host' | 'participant';
  genre: string;
}
