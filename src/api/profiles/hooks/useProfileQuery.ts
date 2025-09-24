import { type UseQueryOptions, type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type GetProfileResponse, getProfile } from '../services/getProfile';

/**
 * TODO: as part of schema refactor, decide on naming, make file name consistent with type name
 */

type UseProfileQueryResult = UseQueryResult<GetProfileResponse, Error>;

export const useProfileQuery = (
  id?: string,
  options?: Omit<UseQueryOptions<GetProfileResponse, Error>, 'queryKey' | 'queryFn'>
): UseProfileQueryResult => {
  return useQuery<GetProfileResponse, Error>({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
    enabled: !!id,
    ...options,
  });
};
