import { mockMusicianProfiles } from './mock';
import type { MusicianProfile } from './types';

export type GetAllProfilesResponse = MusicianProfile[] | undefined;

export const getAllProfiles = (): GetAllProfilesResponse => {
  return mockMusicianProfiles;
};
