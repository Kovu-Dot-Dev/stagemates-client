import { type UseQueryOptions, type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type GetJamsQueryResponse, getJams } from '../services/getJams';

type UseJamQueryResult = UseQueryResult<GetJamsQueryResponse, Error>;

export const useJamsQuery = (
  options?: Omit<UseQueryOptions<GetJamsQueryResponse, Error>, 'queryKey' | 'queryFn'>
): UseJamQueryResult => {
  // will be     <..., AxiosError> once integrated with real API
  return useQuery<GetJamsQueryResponse, Error>({
    queryKey: ['jams'],
    queryFn: () => getJams(),
    ...options,
  });
};
