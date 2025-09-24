import { type UseQueryOptions, type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type GetProfilesResponse, getProfiles } from '../services/getAllProfiles';

/**
 * TODO: as part of schema refactor, decide on naming, make file name consistent with type name
 */

type UseProfilesQueryResult = UseQueryResult<GetProfilesResponse, Error>;

export const useProfilesQuery = (
  options?: Omit<UseQueryOptions<GetProfilesResponse, Error>, 'queryKey' | 'queryFn'>
): UseProfilesQueryResult => {
  return useQuery<GetProfilesResponse, Error>({
    queryKey: ['profiles'],
    queryFn: () => getProfiles(),
    ...options,
  });
};
