import { type UseQueryOptions, type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type GetJamsQueryResponse, getAllJams } from '../services/getJams';

type UseJamQueryResult = UseQueryResult<GetJamsQueryResponse, Error>;

export const useAllJamsQuery = (
  options?: Omit<UseQueryOptions<GetJamsQueryResponse, Error>, 'queryKey' | 'queryFn'>
): UseJamQueryResult => {
  // will be     <..., AxiosError> once integrated with real API
  return useQuery<GetJamsQueryResponse, Error>({
    queryKey: ['jams'],
    queryFn: () => getAllJams(),
    ...options,
  });
};
