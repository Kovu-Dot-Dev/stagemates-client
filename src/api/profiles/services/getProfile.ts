import { mockMusicianProfiles } from './mock';
import type { UserProfileData } from './types';

/**
 * TODO: as part of schema refactor, decide on naming, make file name consistent with type name
 */

export type GetProfileResponse = UserProfileData | undefined;

export const getProfile = (id?: string): GetProfileResponse => {
  if (!id) {
    throw new Error('id is required');
  }

  return mockMusicianProfiles.find((profile) => profile.id === id);
};
