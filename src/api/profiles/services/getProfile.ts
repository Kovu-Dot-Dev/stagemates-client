import { mockMusicianProfiles } from './mock';
import type { MusicianProfile } from './types';

export type GetProfileResponse = MusicianProfile | undefined;

export const getProfile = (id?: string): GetProfileResponse => {
  if (!id) {
    throw new Error('id is required');
  }

  return mockMusicianProfiles.find((profile) => profile.id === id);
};
