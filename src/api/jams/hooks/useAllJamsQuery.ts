import { type UseQueryOptions, type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type GetAllJamsQueryResponse, getAllJams } from '../services/getAllJams';

type UseJamQueryResult = UseQueryResult<GetAllJamsQueryResponse, Error>;

export const useAllJamsQuery = (
  options?: Omit<UseQueryOptions<GetAllJamsQueryResponse, Error>, 'queryKey' | 'queryFn'>
): UseJamQueryResult => {
  // will be     <..., AxiosError> once integrated with real API
  return useQuery<GetAllJamsQueryResponse, Error>({
    queryKey: ['jams'],
    queryFn: () => getAllJams(),
    ...options,
  });
};
