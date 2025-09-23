import { type UseQueryOptions, type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type GetJamQueryResponse, getJam } from '../services/getJam';

type UseJamQueryResult = UseQueryResult<GetJamQueryResponse, Error>;

export const useJamQuery = (
  id?: string,
  options?: Omit<UseQueryOptions<GetJamQueryResponse, Error>, 'queryKey' | 'queryFn'>
): UseJamQueryResult => {
  return useQuery<GetJamQueryResponse, Error>({
    queryKey: ['jam', id],
    queryFn: () => getJam(id),
    enabled: !!id,
    ...options,
  });
};
