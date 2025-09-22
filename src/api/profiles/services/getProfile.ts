import { mockProfiles } from './mock';
import type { Profile } from './types';

export type GetProfileResponse = Profile | undefined;

export const getProfile = (id?: string): GetProfileResponse => {
  if (!id) {
    throw new Error('id is required');
  }

  return mockProfiles.find((profile) => profile.id === id);
};
