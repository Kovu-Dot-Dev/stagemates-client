import { type UseQueryOptions, type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type GetAllProfilesResponse, getAllProfiles } from '../services/getAllProfiles';

/**
 * TODO: as part of schema refactor, decide on naming, make file name consistent with type name
 */

type UseAllProfilesQueryResult = UseQueryResult<GetAllProfilesResponse, Error>;

export const useAllProfilesQuery = (
  options?: Omit<UseQueryOptions<GetAllProfilesResponse, Error>, 'queryKey' | 'queryFn'>
): UseAllProfilesQueryResult => {
  return useQuery<GetAllProfilesResponse, Error>({
    queryKey: ['profiles'],
    queryFn: () => getAllProfiles(),
    ...options,
  });
};
