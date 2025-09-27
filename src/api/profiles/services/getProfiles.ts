import { mockMusicianProfiles } from './mock';
import type { UserProfileData } from './types';

/**
 * TODO: as part of schema refactor, decide on naming, make file name consistent with type name
 */

export type GetProfilesResponse = UserProfileData[] | undefined;

export const getProfiles = (): GetProfilesResponse => {
  return mockMusicianProfiles;
};
