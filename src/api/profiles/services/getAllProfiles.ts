import { mockMusicianProfiles } from './mock';
import type { MusicianProfile } from './types';

/**
 * TODO: as part of schema refactor, decide on naming, make file name consistent with type name
 */

export type GetAllProfilesResponse = MusicianProfile[] | undefined;

export const getAllProfiles = (): GetAllProfilesResponse => {
  return mockMusicianProfiles;
};
