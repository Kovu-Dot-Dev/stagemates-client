import { mockJamSessions } from '@/api/jams/services/mock';
import type { JamSession } from '@/api/jams/services/types';
import { mockMusicianProfiles } from '@/api/profiles/services/mock';
import type { MusicianProfile } from '@/api/profiles/services/types';

export type FeedItem = {
  id: string;
  type: 'musician' | 'jam' | 'band' | 'post';
  data: MusicianProfile | JamSession;
  timestamp: string;
};

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
