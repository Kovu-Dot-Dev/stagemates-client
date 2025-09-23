import { mockProfiles } from './mock';
import type { Profile } from './types';

export type GetAllProfilesResponse = Profile[] | undefined;

export const getAllProfiles = (): GetAllProfilesResponse => {
  return mockProfiles;
};
